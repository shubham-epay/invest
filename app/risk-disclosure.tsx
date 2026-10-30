export const riskDisclosure = 'The trading of foreign exchange, contracts for difference (CFDs), and various other financial instruments involve a substantial level of risk. Please be aware that there is a possibility of losing some or all of your initial investment. Therefore, it is crucial not to invest funds you cannot afford to lose. Familiarize yourself with all the associated risks of trading on margin.';
export const riskWarning = 'Trading in forex and other leveraged financial products involves a high level of risk and may not be suitable for all individuals. These products can result in both gains and losses, and losses may exceed the amount initially invested. It is important to fully understand the risks involved before trading. Independent professional advice should be sought if necessary.';
export const generalAdvice = 'provides general advice that does not consider your specific objectives, financial situation, or needs. The content on this website should not be interpreted as personalized advice. Before trading, carefully assess your investment objectives, experience level, and risk tolerance. Be well-informed about the potential risks associated with trading, and if you have any uncertainties, seek guidance from an independent financial advisor.';
export const registrationStatement = 'Invest.to (Eptra Prime Ltd) is registered under Saint Lucia Registry of International Business Companies';
export const restrictedRegions = 'USA, EU member countries, Iceland, Liechtenstein, UAE and Norway';
export const restrictedRegionExplanation = 'Furthermore, we are unable to provide accounts to individuals residing in countries that are currently experiencing significant and ongoing risks related to anti-money laundering and the financing of terrorism, as these risks pose a threat to the international financial system.';
export const restrictedCountries = "Afghanistan, Angola, Bahamas, Botswana, Myanmar, Cote d'Ivoire (Ivory Coast), Crimea and Sevastopol, Cuba, Democratic People's Republic of Korea (DPRK), Democratic Republic of Congo, Liberia, Ghana, Iran, Iraq, Mongolia, Pakistan, Panama, Somalia, Sudan, Syria, Trinidad and Tobago, Yemen, Zimbabwe";

export function RiskDisclosure({ page = false }: { page?: boolean }) {
 const sections = <>
  <p><strong>Risk Disclosure:</strong> {riskDisclosure}</p>
  <p><strong>Risk Warning:</strong> {riskWarning}</p>
  <p><strong>Invest.to</strong> {generalAdvice}</p>
  <p><strong>Invest.to (Eptra Prime Ltd)</strong> is registered under Saint Lucia Registry of International Business Companies</p>
  <p><strong>Restricted Region:</strong> Our services are not offered in the following regions: <strong>{restrictedRegions}</strong>. {restrictedRegionExplanation}</p>
  <p>The following countries fall under this category: <strong>{restrictedCountries}</strong>.</p>
 </>;
 return <div className={page ? 'risk-disclosure-page' : 'risk-copy'} aria-label="Invest.to risk disclosure and restricted regions">{sections}</div>;
}
