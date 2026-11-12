/**
 * Company facts.
 * `verified: true` = confirmed for the demo (from the client brief / Ferðamálastofa listing).
 * Anything else must be confirmed by Bus2u before launch and is not shown as fact.
 */
export const company = {
  name: 'Bus2u ehf.',
  brand: 'BUS2U',
  location: 'Vogar',
  region: 'Reykjanes',
  country: 'Ísland',
  email: 'bus2u@simnet.is',
  industry: 'Ferðir og fólksflutningar',
  license: 'Skráð dagsferðafyrirtæki hjá Ferðamálastofu',
} as const

/**
 * Found in the Visit Reykjanes directory but not yet confirmed with the client.
 * Intentionally NOT rendered on the site until Bus2u confirms them.
 */
export const unconfirmedContact = {
  address: 'Heiðargerði 25, 190 Vogar',
  phone: '692 9080',
} as const

export const verifiedFacts = [
  { label: 'Fyrirtæki', value: company.name },
  { label: 'Staðsetning', value: `${company.location}, ${company.country}` },
  { label: 'Starfsemi', value: company.industry },
  { label: 'Leyfi', value: 'Dagsferðafyrirtæki — Ferðamálastofa' },
] as const

export const navLinks = [
  { label: 'Heim', href: '/#heim' },
  { label: 'Ferðir', href: '/#ferdir' },
  { label: 'Þjónusta', href: '/#thjonusta' },
  { label: 'Um okkur', href: '/#um' },
  { label: 'Hafa samband', href: '/#samband' },
] as const
