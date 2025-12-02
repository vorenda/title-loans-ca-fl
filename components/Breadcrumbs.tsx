import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://titlecash.com'

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="bg-slate-100 py-3">
        <div className="container mx-auto px-4 lg:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm flex-wrap">
            {items.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                {index > 0 && <span className="text-slate-400">/</span>}
                {index === items.length - 1 ? (
                  <span className="text-slate-900 font-medium">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-amber-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
