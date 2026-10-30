"""Build a dimensional vector treatment from the existing outlined logo master.

The geometry is unchanged. Layered extrusion, material gradients and a shallow
lighting filter add depth without raster backgrounds or font dependencies.
"""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1] / 'public' / 'brand'
source = (root / 'invest-logo-primary.svg').read_text()
width = float(re.search(r'width="([\d.]+)"', source)[1])
body = source[source.index('>') + 1:source.rindex('</svg>')]
mark = body[:body.index('</g>')+4]

def materials(ink, red, mark_only=False):
    red_mask = 'mark-mask' if mark_only else 'red-mask'
    ink_face = '' if mark_only else f'<rect width="{width+14}" height="142" fill="{ink}" mask="url(#ink-mask)"/>'
    return ink_face + f'<rect width="{width+14}" height="142" fill="{red}" mask="url(#{red_mask})"/>'

for variant in ('primary', 'reversed'):
    light = variant == 'reversed'
    ink_face = ['#ffffff', '#eceff2', '#c2c9d1', '#ffffff'] if light else ['#616775', '#282b34', '#151820', '#414753']
    ink_depth = ['#4c5664', '#151b24'] if light else ['#282d38', '#070910']
    defs = f'''
    <defs>
      <mask id="ink-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="{width+14}" height="142">{body.replace('#17171B', '#ffffff').replace('#F41118', '#000000')}</mask>
      <mask id="red-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="{width+14}" height="142">{body.replace('#17171B', '#000000').replace('#F41118', '#ffffff')}</mask>
      <mask id="mark-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="116" height="142">{mark.replace('#F41118', '#ffffff')}</mask>
      <linearGradient id="ink-face" x1="0" y1="0" x2=".15" y2="1">
        <stop stop-color="{ink_face[0]}"/><stop offset=".34" stop-color="{ink_face[1]}"/>
        <stop offset=".73" stop-color="{ink_face[2]}"/><stop offset="1" stop-color="{ink_face[3]}"/>
      </linearGradient>
      <linearGradient id="red-face" x1="0" y1="0" x2=".22" y2="1">
        <stop stop-color="#ff6267"/><stop offset=".28" stop-color="#fa202b"/>
        <stop offset=".7" stop-color="#e00c20"/><stop offset="1" stop-color="#b20820"/>
      </linearGradient>
      <linearGradient id="ink-depth" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="{ink_depth[0]}"/><stop offset="1" stop-color="{ink_depth[1]}"/>
      </linearGradient>
      <linearGradient id="red-depth" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#c10a22"/><stop offset=".5" stop-color="#800819"/>
        <stop offset="1" stop-color="#450a15"/>
      </linearGradient>
      <filter id="bevel" x="-5%" y="-10%" width="110%" height="120%" color-interpolation-filters="sRGB">
        <feGaussianBlur in="SourceAlpha" stdDeviation=".65" result="surface"/>
        <feSpecularLighting in="surface" surfaceScale="2.8" specularConstant=".85" specularExponent="22" lighting-color="#ffffff" result="lighting">
          <feDistantLight azimuth="235" elevation="48"/>
        </feSpecularLighting>
        <feComposite in="lighting" in2="SourceAlpha" operator="in" result="highlights"/>
        <feBlend in="SourceGraphic" in2="highlights" mode="screen"/>
      </filter>
    </defs>'''
    depths = ''.join(f'<g transform="translate({i*.10625:.3f} {i*.09:.3f})">{materials("url(#ink-depth)", "url(#red-depth)")}</g>' for i in range(80, 0, -1))
    front = f'<g filter="url(#bevel)">{materials("url(#ink-face)", "url(#red-face)")}</g>'
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{width+14}" height="142" viewBox="0 0 {width+14} 142" role="img" aria-label="Invest.to 3D logo">{defs}{depths}{front}</svg>'
    (root / f'invest-logo-3d-{variant}.svg').write_text(svg)
    if variant == 'primary':
        mark_depth = ''.join(f'<g transform="translate({i*.10625:.3f} {i*.09:.3f})">{materials("url(#ink-depth)", "url(#red-depth)", True)}</g>' for i in range(80, 0, -1))
        mark_front = f'<g filter="url(#bevel)">{materials("url(#ink-face)", "url(#red-face)", True)}</g>'
        (root / 'invest-icon-3d.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="116" height="116" viewBox="0 15 116 116" role="img" aria-label="Invest.to">{defs}{mark_depth}{mark_front}</svg>')
print('Created two transparent dimensional SVG logos from original outlines')
