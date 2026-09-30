# Image assets

Originals are kept in `../_source-assets/`: the previous site's images at the top level, and every crop taken from the company PDF in `pdf-crops/`.

## From the company PDF (`public/images/pdf/`)

Cropped from `Presentation_UNI INDUS GLOBAL_Updated_20260907.pdf` so the site uses the same imagery as the presentation.

| Published file | PDF page | Used for |
| --- | --- | --- |
| `leader-rajendra`, `leader-binu`, `leader-seshu` | p14 | Our Core Leadership Team portraits |
| `partner-logo-*` (8) | p16 | Partner card logos |
| `partner-photo-*` (7; ONGC has none in the PDF) | p16 | Partner card photos |
| `brands/p9-*` (18) | p9 | Trusted Global Brands panel, Product Portfolio |
| `brands/p10-*` (20) | p10 | Our Premium Brands band, Hydraulics & Technical Supplies |
| `industry-panorama` | p12 | Industries We Serve banner |
| `industry-oilgas` | p12 (panorama rig) | Oil & Gas card |
| `industry-marine`, `-construction`, `-energy`, `-manufacturing` | p12 | Industry cards |

The PDF embeds each page as one image of about 1536 px wide, so these crops are small (portraits 152 px, industry card images about 200 px). They are shown at or near their natural size, or faded behind text as on p12. If the client has the original photos and logo files, dropping them in under the same names will make them sharper.

## From the previous site (`public/images/`)

| Published name | Used for |
| --- | --- |
| `hero-rig` | Hero background, `og-image.jpg`. This is the scene on PDF p1 and in the reference screenshot. The original is only 1024 px wide, and the PDF's copy is smaller still. |
| `about-offshore-rig`, `hero-engineers`, `about-global-logistics`, `about-valves` | About mosaic (valves also in the OEM card) |
| `hero-warehouse`, `about-shipping-port` | Why Choose tiles, Procurement panel |
| `services-collage`, `products-collage` | Manpower and Hydraulics panels |
| `hero-network` | Vision/Mission/Values and Partners backgrounds |
| `logo-mark-96/192` | Header, hero badge, footer, JSON-LD |

The two Unsplash photos used earlier for Construction and Manufacturing have been removed; those cards now use the PDF's own images.

The photographs appear AI-generated, in the same style as the PDF. They are used as brand imagery, the way the presentation uses them.
