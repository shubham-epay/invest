"""Generate the flat Perspective identity with outlined Poppins Medium lettering."""
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from pathlib import Path

font = TTFont('public/fonts/Poppins-Medium.ttf')
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
scale = 94 / font['head'].unitsPerEm
root = Path('public/brand')
mark = 'M2 30V2H30V9H9V30Z M34 13V34H13V27H27V13Z'
for name, ink, red in [('primary','#192638','#F41118'), ('reversed','#FFFFFF','#F41118'), ('mono-dark','#192638','#192638'), ('mono-white','#FFFFFF','#FFFFFF')]:
    x, paths = 105, []
    for i, ch in enumerate('invest.to'):
        gn = cmap[ord(ch)]
        pen = SVGPathPen(glyphs)
        glyphs[gn].draw(pen)
        paths.append(f'<path d="{pen.getCommands()}" transform="translate({x:.3f} 98) scale({scale:.6f} {-scale:.6f})" fill="{ink if i < 6 else red}"/>')
        x += font['hmtx'][gn][0] * scale - 2.8
    emblem = f'<path d="{mark}" transform="translate(0 32) scale(1.95)" fill="{red}"/>'
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{x+5:.1f}" height="116" viewBox="0 0 {x+5:.1f} 116" role="img" aria-label="Invest.to">{emblem}{"".join(paths)}</svg>'
    (root/f'invest-logo-{name}.svg').write_text(svg)
(root/'invest-icon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="white"/><path d="{mark}" transform="translate(10 10) scale(1.22)" fill="#F41118"/></svg>')
print('Created Perspective mark and four flat vector lockups')
