'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail, ArrowRight } from 'lucide-react';

export const SUPPORT_EMAIL = 'support@invest.to';
const topics = [
 ['general','General enquiry'], ['account','Account opening'], ['sign-in','Sign-in help'],
 ['password','Password reset help'], ['platform','MetaTrader 5 support'], ['demo','Demo account'],
 ['deposit','Deposit support'], ['withdrawal','Withdrawal support'], ['partnership','Partnerships'], ['privacy','Privacy enquiry'],
] as const;
type ContactFormProps = { topic?: string; account?: string; showAccount?: boolean; title?: string };

export function ContactForm({ topic = 'general', account = 'standard', showAccount = false, title = 'Contact us.' }: ContactFormProps) {
 const [selectedTopic, setTopic] = useState(topic);
 const [selectedAccount, setAccount] = useState(account);
 const [draft, setDraft] = useState<{subject:string;body:string}|null>(null);
 const [copyStatus, setCopyStatus] = useState('');
 const [formError, setFormError] = useState('');
 useEffect(() => {
  const query = new URLSearchParams(window.location.search);
  const queryTopic = query.get('topic');
  const queryAccount = query.get('account');
  if (queryTopic && topics.some(([value]) => value === queryTopic)) setTopic(queryTopic);
  if (queryAccount && ['standard','raw','professional'].includes(queryAccount)) setAccount(queryAccount);
 }, []);
 function prepareMessage(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const message = String(data.get('message') || '').trim();
  if (!name || !email || message.length < 10) {
   setFormError(!name ? 'Please enter your name.' : message.length < 10 ? 'Please enter a message with at least 10 characters, excluding extra spaces.' : 'Please enter your email address.');
   return;
  }
  setFormError('');
  const topicLabel = topics.find(([value]) => value === selectedTopic)?.[1] || 'General enquiry';
  const accountLabel = selectedAccount.charAt(0).toUpperCase() + selectedAccount.slice(1);
  setDraft({subject:`Invest.to — ${topicLabel}${showAccount ? ` (${accountLabel})` : ''}`, body:`Name: ${name}\nReply email: ${email}\nTopic: ${topicLabel}${showAccount ? `\nAccount package: ${accountLabel}` : ''}\n\n${message}`});
  setCopyStatus('');
 }
 async function copyMessage() {
  if (!draft) return;
  try { await navigator.clipboard.writeText(`To: ${SUPPORT_EMAIL}\nSubject: ${draft.subject}\n\n${draft.body}`); setCopyStatus('Message copied. Paste it into your email and send it to support@invest.to.'); }
  catch { setCopyStatus('Select and copy the message below, then send it to support@invest.to.'); }
 }
 return <div className="contact-form-card" id="contact-form">
  <div className="contact-form-heading"><Mail size={26} strokeWidth={1.4}/><h2>{title}</h2><p>Write to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p></div>
  <form onSubmit={prepareMessage} onChange={() => {setDraft(null);setCopyStatus('');setFormError('');}}>
   <div className="form-field-row">
    <label>Full name<input name="name" autoComplete="name" required maxLength={100} placeholder="Your name"/></label>
    <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></label>
   </div>
   <div className={showAccount ? 'form-field-row' : ''}>
    <label>What can we help with?<select name="topic" value={selectedTopic} onChange={e=>setTopic(e.target.value)}>{topics.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
    {showAccount && <label>Account package<select name="account" value={selectedAccount} onChange={e=>setAccount(e.target.value)}><option value="standard">Standard — from $10</option><option value="raw">Raw — from $500</option><option value="professional">Professional — from $10,000</option></select></label>}
   </div>
   <label>Message<textarea name="message" required minLength={10} maxLength={3000} rows={5} placeholder="Tell us how we can help."/></label>
   <p className="form-privacy">Do not include passwords, payment details or identity documents. See our <a href="/legal/privacy">Privacy Policy</a>.</p>
   {formError && <p className="form-error" role="alert">{formError}</p>}
   <button className="button primary" type="submit">Prepare email <ArrowRight size={18}/></button>
   <p className="form-delivery-note">This form prepares an email. Send it from your email app to contact our team.</p>
  </form>
  {draft && <section className="message-draft" aria-label="Prepared email">
   <div role="status"><Check size={20}/><h3>Your email is ready.</h3></div>
   <p>Send the message to <strong>{SUPPORT_EMAIL}</strong> from your email app. It has not been sent yet.</p>
   <dl><div><dt>To</dt><dd>{SUPPORT_EMAIL}</dd></div><div><dt>Subject</dt><dd>{draft.subject}</dd></div></dl>
   <pre tabIndex={0}>{draft.body}</pre>
   <div className="actions"><a className="button primary" href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}>Open email app <ArrowUpRight size={17}/></a><button type="button" className="button outline" onClick={copyMessage}><Copy size={17}/>Copy message</button></div>
   <p className="form-delivery-note" role="status">{copyStatus || 'No email app configured? Copy the message into your preferred email service.'}</p>
  </section>}
 </div>;
}
