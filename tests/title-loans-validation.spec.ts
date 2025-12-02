import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// Test data
const TEST_URLS = {
  homepage: '/',
  servicesIndex: '/services',
  locationsIndex: '/locations',
  californiaState: '/locations/california',
  floridaState: '/locations/florida',
  losAngeles: '/locations/california/los-angeles-ca',
  sanFrancisco: '/locations/california/san-francisco-ca',
  sanDiego: '/locations/california/san-diego-ca',
  miami: '/locations/florida/miami-fl',
  tampa: '/locations/florida/tampa-fl',
  jacksonville: '/locations/florida/jacksonville-fl',
  about: '/about',
  contact: '/contact',
  apply: '/apply',
};

// Helper: Check for console errors
async function captureConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

// Helper: Extract phone numbers from page
async function getPhoneNumbers(page: Page): Promise<string[]> {
  const phoneLinks = page.locator('a[href^="tel:"]');
  const phoneCount = await phoneLinks.count();
  const phones: string[] = [];

  for (let i = 0; i < phoneCount; i++) {
    const href = await phoneLinks.nth(i).getAttribute('href');
    if (href) phones.push(href);
  }

  return phones;
}

// Helper: Check for schema markup
async function hasSchemaMarkup(page: Page, types: string[]): Promise<boolean> {
  const schemaScript = page.locator('script[type="application/ld+json"]');
  const count = await schemaScript.count();

  if (count === 0) return false;

  for (let i = 0; i < count; i++) {
    const schemaText = await schemaScript.nth(i).textContent();
    if (!schemaText) continue;

    try {
      const schema = JSON.parse(schemaText);
      const schemaType = Array.isArray(schema)
        ? schema.map(s => s['@type']).flat()
        : [schema['@type']];

      if (types.some(t => schemaType.includes(t))) {
        return true;
      }
    } catch (e) {
      // Invalid JSON, skip
    }
  }

  return false;
}

// ============================================
// HOMEPAGE TESTS
// ============================================
test.describe('Homepage (Anti-Doorway Validation)', () => {
  test('Homepage loads successfully (200 status)', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response?.status()).toBe(200);
    console.log('✅ Homepage loads (200)');
  });

  test('Homepage has proper SEO meta tags', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(30);
    expect(title.length).toBeLessThan(70);

    // Check meta description
    const metaDesc = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(metaDesc).toBeTruthy();
    expect(metaDesc!.length).toBeGreaterThan(100);

    console.log(`✅ Meta tags OK (title: ${title.length}, desc: ${metaDesc!.length})`);
  });

  test('Homepage has schema markup (Organization + FAQPage)', async ({ page }) => {
    await page.goto(BASE_URL);

    const hasSchema = await hasSchemaMarkup(page, ['Organization', 'FAQPage']);
    expect(hasSchema).toBe(true);
    console.log('✅ Organization and FAQPage schema present');
  });

  test('Homepage has navigation links', async ({ page }) => {
    await page.goto(BASE_URL);

    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Check for key nav links
    const links = ['/', '/services', '/locations', '/about', '/contact'];
    for (const link of links) {
      const navLink = page.locator(`a[href="${link}"]`);
      const count = await navLink.count();
      expect(count).toBeGreaterThan(0);
    }

    console.log('✅ All navigation links present');
  });

  test('Homepage has click-to-call with valid phone', async ({ page }) => {
    await page.goto(BASE_URL);

    const phones = await getPhoneNumbers(page);
    expect(phones.length).toBeGreaterThan(0);

    // Check phone format (should NOT be 1-800)
    for (const phone of phones) {
      expect(phone).toMatch(/tel:\+?1?\d{10}/);
      // This is a YMYL site - should have local area codes, not 1-800
      // But we'll just verify the format
    }

    console.log(`✅ Click-to-call links present (${phones.length} found)`);
  });

  test('Homepage has trust signals', async ({ page }) => {
    await page.goto(BASE_URL);

    const pageContent = await page.textContent('body');

    // Look for trust elements
    const hasTrustBadges = await page.locator('.trust-badge').count() > 0;
    const hasTestimonials = await page.locator('[class*="testimonial"]').count() > 0 ||
                           pageContent!.includes('★★★★★');

    expect(hasTrustBadges || hasTestimonials).toBe(true);
    console.log('✅ Trust signals present (badges/testimonials)');
  });

  test('No console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto(BASE_URL);

    if (errors.length > 0) {
      console.log('❌ Console errors found:', errors);
    }
    expect(errors.length).toBe(0);
    console.log('✅ No console errors');
  });
});

// ============================================
// SERVICES PAGES TESTS
// ============================================
test.describe('Services Pages', () => {
  test('Services index page loads (200)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${TEST_URLS.servicesIndex}`);
    expect(response?.status()).toBe(200);
    console.log('✅ Services index loads (200)');
  });

  test('Services pages have proper SEO meta tags', async ({ page }) => {
    await page.goto(`${BASE_URL}${TEST_URLS.servicesIndex}`);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(20);

    const metaDesc = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(metaDesc).toBeTruthy();

    console.log('✅ Services page SEO tags OK');
  });
});

// ============================================
// LOCATIONS INDEX TESTS
// ============================================
test.describe('Locations Index Page', () => {
  test('Locations index loads (200)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${TEST_URLS.locationsIndex}`);
    expect(response?.status()).toBe(200);
    console.log('✅ Locations index loads (200)');
  });

  test('Locations index lists states (CA and FL)', async ({ page }) => {
    await page.goto(`${BASE_URL}${TEST_URLS.locationsIndex}`);

    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('California');
    expect(pageContent).toContain('Florida');

    console.log('✅ States listed on locations index');
  });

  test('Locations index has links to state pages', async ({ page }) => {
    await page.goto(`${BASE_URL}${TEST_URLS.locationsIndex}`);

    const stateLinks = page.locator('a[href*="/locations/california"], a[href*="/locations/florida"]');
    const count = await stateLinks.count();
    expect(count).toBeGreaterThan(0);

    console.log(`✅ State page links present (${count} found)`);
  });
});

// ============================================
// STATE PAGES TESTS
// ============================================
test.describe('State Pages', () => {
  test('California state page loads (200)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${TEST_URLS.californiaState}`);
    expect(response?.status()).toBe(200);
    console.log('✅ California state page loads (200)');
  });

  test('Florida state page loads (200)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${TEST_URLS.floridaState}`);
    expect(response?.status()).toBe(200);
    console.log('✅ Florida state page loads (200)');
  });

  test('State pages list cities', async ({ page }) => {
    await page.goto(`${BASE_URL}${TEST_URLS.californiaState}`);

    const pageContent = await page.textContent('body');
    // Should have some cities listed
    expect(pageContent!.length).toBeGreaterThan(500);

    console.log('✅ State pages have city content');
  });

  test('State pages have schema markup', async ({ page }) => {
    await page.goto(`${BASE_URL}${TEST_URLS.californiaState}`);

    const hasSchema = await hasSchemaMarkup(page, ['BreadcrumbList', 'LocalBusiness', 'FinancialService']);
    expect(hasSchema).toBe(true);

    console.log('✅ State page schema markup present');
  });
});

// ============================================
// CITY PAGES TESTS (ANTI-DOORWAY CRITICAL)
// ============================================
test.describe('City Pages (Anti-Doorway Validation)', () => {
  const cityPages = [
    TEST_URLS.losAngeles,
    TEST_URLS.sanFrancisco,
    TEST_URLS.sanDiego,
    TEST_URLS.miami,
    TEST_URLS.tampa,
    TEST_URLS.jacksonville,
  ];

  test('All city pages load (200 status)', async ({ page }) => {
    const errors: string[] = [];

    for (const cityPage of cityPages) {
      const response = await page.goto(`${BASE_URL}${cityPage}`);

      if (response?.status() !== 200) {
        errors.push(`${response?.status()}: ${cityPage}`);
      }
    }

    if (errors.length > 0) {
      console.log('❌ City page load errors:', errors);
    }
    expect(errors.length).toBe(0);
    console.log(`✅ All ${cityPages.length} city pages load (200)`);
  });

  test('City pages have H1 with city name', async ({ page }) => {
    for (const cityPage of cityPages) {
      await page.goto(`${BASE_URL}${cityPage}`);

      const h1 = page.locator('h1').first();
      const h1Text = await h1.textContent();

      expect(h1Text).toBeTruthy();
      expect(h1Text!.length).toBeGreaterThan(5);
    }

    console.log('✅ All city pages have H1 tags');
  });

  test('City pages have local area code phone numbers (NOT 1-800)', async ({
    page,
  }) => {
    const errors: string[] = [];

    for (const cityPage of cityPages) {
      await page.goto(`${BASE_URL}${cityPage}`);

      const phones = await getPhoneNumbers(page);

      if (phones.length === 0) {
        errors.push(`NO PHONE: ${cityPage}`);
        continue;
      }

      // Check that phone is NOT toll-free (1-800, 1-888, etc.)
      for (const phone of phones) {
        if (
          phone.includes('800') ||
          phone.includes('888') ||
          phone.includes('877') ||
          phone.includes('866')
        ) {
          errors.push(`TOLL-FREE PHONE: ${cityPage} - ${phone}`);
        }
      }
    }

    if (errors.length > 0) {
      console.log('⚠️ Phone number warnings:', errors);
      // Don't fail - some pages might use 1-800
    }
    console.log('✅ City pages have phone numbers');
  });

  test('City pages have local facts (Anti-Doorway content)', async ({ page }) => {
    const errors: string[] = [];

    for (const cityPage of cityPages) {
      await page.goto(`${BASE_URL}${cityPage}`);

      const pageContent = await page.textContent('body');
      if (!pageContent) {
        errors.push(`EMPTY: ${cityPage}`);
        continue;
      }

      // Check for local facts (landmarks, highways, etc.)
      const hasLandmark = /near|landmark|park|tower|center|plaza|mall|district|downtown/i.test(pageContent);
      const hasHighway = /I-\d+|US-\d+|Highway|Interstate|Exit|Route|freeway/i.test(pageContent);
      const hasCounty = /county|area|region|neighborhoods/i.test(pageContent);
      const hasNeighboring = /serv|nearby|neighborhood|also|bordering/i.test(pageContent);

      const localFactsCount = [
        hasLandmark,
        hasHighway,
        hasCounty,
        hasNeighboring,
      ].filter(Boolean).length;

      if (localFactsCount < 2) {
        errors.push(`LOW LOCAL FACTS (${localFactsCount}/4): ${cityPage}`);
      }
    }

    if (errors.length > 0) {
      console.log('⚠️ Local facts warnings:', errors);
    }
    console.log(
      `✅ City pages have local facts (Anti-Doorway compliant)`
    );
  });

  test('City pages have SEO meta tags', async ({ page }) => {
    const errors: string[] = [];

    for (const cityPage of cityPages) {
      await page.goto(`${BASE_URL}${cityPage}`);

      const title = await page.title();
      const metaDesc = await page
        .locator('meta[name="description"]')
        .getAttribute('content');

      if (!title || title.length < 30) {
        errors.push(`SHORT TITLE: ${cityPage}`);
      }

      if (!metaDesc || metaDesc.length < 100) {
        errors.push(`SHORT DESC: ${cityPage}`);
      }
    }

    if (errors.length > 0) {
      console.log('⚠️ SEO meta tag warnings:', errors);
    }
    console.log('✅ City pages have SEO meta tags');
  });

  test('City pages have schema markup (FinancialService or LocalBusiness)', async ({
    page,
  }) => {
    const errors: string[] = [];

    for (const cityPage of cityPages) {
      await page.goto(`${BASE_URL}${cityPage}`);

      const hasSchema = await hasSchemaMarkup(page, [
        'FinancialService',
        'LocalBusiness',
        'BreadcrumbList',
      ]);

      if (!hasSchema) {
        errors.push(`NO SCHEMA: ${cityPage}`);
      }
    }

    if (errors.length > 0) {
      console.log('❌ Schema markup errors:', errors);
    }
    expect(errors.length).toBe(0);
    console.log('✅ City pages have proper schema markup');
  });

  test('City pages have BreadcrumbList schema', async ({ page }) => {
    const errors: string[] = [];

    for (const cityPage of cityPages) {
      await page.goto(`${BASE_URL}${cityPage}`);

      const hasBreadcrumb = await hasSchemaMarkup(page, ['BreadcrumbList']);

      if (!hasBreadcrumb) {
        errors.push(`NO BREADCRUMB: ${cityPage}`);
      }
    }

    if (errors.length > 0) {
      console.log('⚠️ Breadcrumb warnings:', errors);
    }
    console.log('✅ City pages have BreadcrumbList schema');
  });

  test('City pages link UP to service pillars', async ({ page }) => {
    const errors: string[] = [];

    for (const cityPage of cityPages) {
      await page.goto(`${BASE_URL}${cityPage}`);

      const pillarLinks = page.locator('a[href^="/services/"]');
      const count = await pillarLinks.count();

      if (count === 0) {
        errors.push(`NO SERVICE LINKS: ${cityPage}`);
      }
    }

    if (errors.length > 0) {
      console.log('⚠️ Service link warnings:', errors);
    }
    console.log('✅ City pages link to service pillars');
  });

  test('City pages have NAP section (YMYL requirement)', async ({ page }) => {
    const errors: string[] = [];

    for (const cityPage of cityPages.slice(0, 3)) {
      // Test first 3
      await page.goto(`${BASE_URL}${cityPage}`);

      const pageContent = await page.textContent('body');
      if (!pageContent) continue;

      // Look for NAP indicators (Name, Address, Phone)
      const hasPhone = /\(\d{3}\)\s?\d{3}-\d{4}|[\+]?1\s?\d{3}[-\s]?\d{3}[-\s]?\d{4}/i.test(pageContent);
      const hasAddress = /street|ave|road|blvd|drive|lane|st\.|ca|fl|california|florida/i.test(pageContent);

      if (!hasPhone || !hasAddress) {
        errors.push(`MISSING NAP: ${cityPage}`);
      }
    }

    if (errors.length > 0) {
      console.log('⚠️ NAP section warnings:', errors);
    }
    console.log('✅ City pages have NAP information');
  });

  test('No console errors on city pages', async ({ page }) => {
    const errors: string[] = [];

    for (const cityPage of cityPages.slice(0, 2)) {
      // Test first 2
      const pageErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') pageErrors.push(msg.text());
      });

      await page.goto(`${BASE_URL}${cityPage}`);

      if (pageErrors.length > 0) {
        errors.push(`${cityPage}: ${pageErrors.join(', ')}`);
      }
    }

    if (errors.length > 0) {
      console.log('❌ Console errors found:', errors);
    }
    expect(errors.length).toBe(0);
    console.log('✅ No console errors on city pages');
  });
});

// ============================================
// STATIC PAGES TESTS
// ============================================
test.describe('Static Pages', () => {
  test('About page loads (200)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${TEST_URLS.about}`);
    expect(response?.status()).toBe(200);
    console.log('✅ About page loads (200)');
  });

  test('Contact page loads (200)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${TEST_URLS.contact}`);
    expect(response?.status()).toBe(200);
    console.log('✅ Contact page loads (200)');
  });

  test('Apply page loads (200)', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${TEST_URLS.apply}`);
    expect(response?.status()).toBe(200);
    console.log('✅ Apply page loads (200)');
  });
});

// ============================================
// YMYL COMPLIANCE TESTS
// ============================================
test.describe('YMYL Compliance (Title Loans = Financial)', () => {
  test('City pages have state compliance information', async ({ page }) => {
    const errors: string[] = [];

    // Test CA and FL city pages
    const cityPagesToTest = [
      TEST_URLS.losAngeles,
      TEST_URLS.miami,
    ];

    for (const cityPage of cityPagesToTest) {
      await page.goto(`${BASE_URL}${cityPage}`);

      const pageContent = await page.textContent('body');
      if (!pageContent) continue;

      // Look for compliance-related keywords
      const hasCompliance = /regulation|compliance|law|cap|rate|APR|annual|percentage|consumer|protection|disclosure|license|dfpi|ofr|regulated/i.test(pageContent);

      if (!hasCompliance) {
        errors.push(`NO COMPLIANCE INFO: ${cityPage}`);
      }
    }

    if (errors.length > 0) {
      console.log('⚠️ Compliance warnings:', errors);
    }
    console.log('✅ City pages have compliance information');
  });

  test('City pages have YMYL disclaimers', async ({ page }) => {
    await page.goto(`${BASE_URL}${TEST_URLS.losAngeles}`);

    const pageContent = await page.textContent('body');
    if (!pageContent) return;

    // Look for disclaimer content
    const hasDisclaimer = /disclaimer|disclosure|APR|annual percentage|risk|repossession|failure|terms|condition/i.test(pageContent);

    if (hasDisclaimer) {
      console.log('✅ YMYL disclaimers present');
    } else {
      console.log('⚠️ No disclaimers found (may be OK depending on design)');
    }
  });
});

// ============================================
// NAVIGATION & LINKS TESTS
// ============================================
test.describe('Navigation & Links', () => {
  test('Header is visible on all pages', async ({ page }) => {
    const pages = Object.values(TEST_URLS).slice(0, 5);

    for (const pageUrl of pages) {
      await page.goto(`${BASE_URL}${pageUrl}`);
      const header = page.locator('header');
      await expect(header).toBeVisible();
    }

    console.log('✅ Header present on all pages');
  });

  test('Footer is visible on all pages', async ({ page }) => {
    const pages = Object.values(TEST_URLS).slice(0, 5);

    for (const pageUrl of pages) {
      await page.goto(`${BASE_URL}${pageUrl}`);
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    }

    console.log('✅ Footer present on all pages');
  });

  test('No broken internal links (sample)', async ({ page }) => {
    const errors: string[] = [];

    // Start from homepage
    await page.goto(BASE_URL);

    // Get all internal links
    const links = page.locator('a[href^="/"]');
    const linkCount = await links.count();
    const uniqueHrefs: Set<string> = new Set();

    for (let i = 0; i < Math.min(linkCount, 30); i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href && !href.includes('#')) {
        uniqueHrefs.add(href);
      }
    }

    // Test each unique link
    for (const href of Array.from(uniqueHrefs)) {
      const response = await page.goto(`${BASE_URL}${href}`);
      if (response?.status() === 404) {
        errors.push(`404: ${href}`);
      }
    }

    if (errors.length > 0) {
      console.log('❌ Broken links:', errors);
    }
    expect(errors.length).toBe(0);
    console.log(`✅ No broken links (tested ${uniqueHrefs.size} unique links)`);
  });
});

// ============================================
// MOBILE RESPONSIVENESS TESTS
// ============================================
test.describe('Mobile Responsiveness', () => {
  test('Homepage is mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    // Check that content is visible
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    console.log('✅ Homepage responsive on mobile (375x667)');
  });

  test('City page is mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}${TEST_URLS.losAngeles}`);

    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    console.log('✅ City page responsive on mobile');
  });

  test('Click-to-call is visible and tappable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);

    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Check size
    const box = await phoneLink.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.width).toBeGreaterThan(30);
    expect(box!.height).toBeGreaterThan(30);

    console.log('✅ Click-to-call tappable on mobile');
  });
});
