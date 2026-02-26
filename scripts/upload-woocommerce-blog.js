#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.production' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Helper functions for TipTap JSON structure
const heading = (level, content) => ({
  type: "heading",
  attrs: { level },
  content: [{ type: "text", text: content }]
});

const para = (...content) => ({
  type: "paragraph",
  content: content.flat().filter(Boolean)
});

const text = (content, marks = []) => ({
  type: "text",
  text: content,
  ...(marks.length > 0 && { marks })
});

const bold = (content) => text(content, [{ type: "bold" }]);

const italic = (content) => text(content, [{ type: "italic" }]);

const link = (content, href) => text(content, [{
  type: "link",
  attrs: {
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    class: null
  }
}]);

const bulletList = (...items) => ({
  type: "bulletList",
  content: items.map(item => ({
    type: "listItem",
    content: [{ type: "paragraph", content: Array.isArray(item) ? item : [text(item)] }]
  }))
});

const orderedList = (...items) => ({
  type: "orderedList",
  attrs: { start: 1, type: null },
  content: items.map(item => ({
    type: "listItem",
    content: [{ type: "paragraph", content: Array.isArray(item) ? item : [text(item)] }]
  }))
});

// Generate the comprehensive blog content
const content = {
  type: "doc",
  content: [
    // Introduction
    heading(2, "Running a Successful Online Store"),
    para(
      text("Running a successful online store requires more than just listing products and waiting for sales to roll in. The right tools can transform your WooCommerce store from a basic shopping platform into a powerful sales machine that attracts customers, streamlines operations, and drives revenue growth. With thousands of plugins available in the WordPress ecosystem, finding the ones that truly make a difference can feel overwhelming.")
    ),
    para(
      text("Whether you're launching your first online store or looking to optimize an existing one, the plugins you choose will directly impact your store's performance, customer experience, and your ability to scale. From automating repetitive tasks to enhancing security, managing inventory, and improving search visibility, the right combination of tools can save you countless hours while boosting your bottom line.")
    ),
    para(
      text("In this comprehensive guide, we'll walk through the essential plugins that can elevate your WooCommerce store to new heights. These aren't just nice-to-have additions—they're proven solutions that address real challenges faced by online store owners every day.")
    ),

    // Main Section
    heading(2, "Must-Have 20 WooCommerce Plugins for an Ecommerce Store"),

    // Plugin 1: OptinMonster
    heading(3, "1. OptinMonster"),
    para(
      text("OptinMonster transforms casual visitors into subscribers and customers through strategically timed, visually compelling opt-in campaigns that capture attention without disrupting the shopping experience. This powerful lead generation tool goes far beyond basic popup forms, offering lightbox popups, floating bars, slide-ins, fullscreen welcome mats, and inline forms that can be deployed across your WooCommerce store based on sophisticated targeting rules.")
    ),
    para(
      text("You can trigger campaigns based on exit intent technology that detects when visitors are about to leave, giving you one final opportunity to convert them with special offers or email signup incentives. The drag-and-drop campaign builder requires no coding skills yet produces professional designs that match your brand perfectly, with hundreds of prebuilt templates available to accelerate your setup.")
    ),
    para(
      text("For ecommerce specifically, you can reduce cart abandonment with timed discounts, grow your email list for future marketing, promote flash sales to engaged visitors, and recover potentially lost sales through strategic intervention at critical moments in the customer journey.")
    ),

    // Plugin 2: WooCommerce Product Recommendations
    heading(3, "2. WooCommerce Product Recommendations"),
    para(
      text("WooCommerce Product Recommendations enables users to use product recommendations to increase their sales through upselling and cross-selling techniques which present items to customers based on their current needs. The plugin provides users with pre-designed templates which include options for displaying related products and best-selling items and top-rated products and frequently purchased items and newly released products and items that customers have recently viewed.")
    ),
    para(
      text("It enables you to modify the rules for generating recommendations and their display locations, which allows you to create personalized recommendations based on the customer's previous online activity and their previous purchases. The product recommendations plugin enables users to decide where to display recommendations throughout product pages and the cart page and checkout page and thank-you page, while enabling them to arrange products according to price and popularity and product rating.")
    ),
    para(
      text("The system enables users to design custom recommendation grids, which they can use to showcase their selected collections and their temporary promotional offers.")
    ),

    // Plugin 3: Jetpack
    heading(3, "3. Jetpack"),
    para(
      text("Jetpack serves as an all-in-one solution that brings enterprise-level features to your WooCommerce store without the enterprise price tag. It provides real-time backup capabilities, protecting your store's data from unexpected losses, while its security scanning features actively monitor for threats and vulnerabilities.")
    ),
    para(
      text("The downtime monitoring alerts you immediately if your store goes offline, minimizing potential revenue loss. Jetpack also includes performance enhancements like image optimization and a content delivery network that speeds up your site globally.")
    ),
    para(
      text("Beyond the technical features, it offers social media auto-posting, allowing you to share new products across platforms effortlessly. The unified dashboard brings all these features together, giving you comprehensive control over your store's health and performance from one central location.")
    ),

    // Plugin 4: Product Import Export
    heading(3, "4. Product Import Export Plugin For WooCommerce"),
    para(
      text("The WooCommerce Product Import Export plugin eliminates the tedious manual work of adding or updating products one by one, making bulk product management remarkably efficient. This plugin supports CSV, XML, Excel, and TSV formats, allowing you to import hundreds or thousands of products in minutes rather than hours.")
    ),
    para(
      text("It handles complex product types, including simple products, variations, grouped products, and external products with equal ease. The mapping interface lets you match your spreadsheet columns to WooCommerce fields precisely, ensuring data lands exactly where it should.")
    ),
    para(
      text("You can also export your entire product catalog for backup purposes or to work on updates offline before reimporting. The product import and export plugin preserves product images, categories, tags, attributes, and custom fields during the transfer process. For stores that need to sync inventory across multiple platforms or migrate from other eCommerce systems, this tool becomes indispensable. It even supports scheduled imports, letting you automate regular product updates from suppliers or warehouses.")
    ),

    // Plugin 5: Mollie Payments
    heading(3, "5. Mollie Payments for WooCommerce"),
    para(
      text("Mollie Payments for WooCommerce opens your store to customers across Europe and beyond by supporting over 30 payment methods through a single integration. This European payment gateway handles everything from credit cards and PayPal to local payment methods like iDEAL, Bancontact, and Klarna, ensuring customers can pay using their preferred option.")
    ),
    para(
      text("The plugin provides a seamless checkout experience with payment methods that integrate directly into your store rather than redirecting customers to external pages. It supports multiple currencies and handles the complexity of international transactions automatically.")
    ),
    para(
      text("Transaction fees are competitive and transparent, with no hidden costs or monthly fees. For subscription-based products, it handles recurring payments smoothly. The plugin also supports refunds directly from your WooCommerce dashboard, simplifying post-sale management and customer service operations.")
    ),

    // Plugin 6: Request a Quote
    heading(3, "6. Request a Quote for WooCommerce"),
    para(
      text("The Request a Quote plugin assists stores which need to negotiate prices before they finalize their pricing and ordering processes. The system creates a buying process which allows customers to obtain custom quotes and bulk pricing information while they need to resolve their questions before making their purchase.")
    ),
    para(
      text("Its main functions provide users with an add-to-quote button which lets them create quote requests and manage their quotes. The user has the ability to assess each request, make changes to the offer, and create a custom quote which the customer can approve. The system supports stores which offer products that customers can customize and businesses that provide specialized services and organizations which need to change their product pricing.")
    ),
    para(
      text("The system supports guest users who want to create quote requests, sends automated email alerts about quotes, generates PDF quotes and provides users with the choice to disable the standard add-to-cart button. The user has the power to create custom messages, manage which products can use the add-to-quote feature, and change the appearance of the quote form.")
    ),

    // Plugin 7: Customer Reviews
    heading(3, "7. Customer Reviews for WooCommerce"),
    para(
      text("Customer Reviews for WooCommerce transforms basic product reviews into a powerful trust-building and conversion tool for your store. This plugin enhances the standard WooCommerce review system with features that encourage more customers to share their experiences and make those reviews more valuable to future shoppers.")
    ),
    para(
      text("It enables photo and video reviews, allowing customers to show products in real-world use, which significantly increases credibility compared to text-only feedback. The plugin can automatically send review reminder emails after purchase, dramatically increasing your review collection rate without manual follow-up.")
    ),
    para(
      text("It supports review filtering and sorting, helping customers find the most relevant feedback quickly. The trust badges and review widgets can be displayed throughout your site, not just on product pages, extending social proof across your entire store. You can also moderate reviews efficiently, respond to customer feedback publicly, and even import reviews from other platforms to build initial credibility for new products.")
    ),

    // Plugin 8: Smart Coupons
    heading(3, "8. Smart Coupons for WooCommerce Coupons"),
    para(
      text("This is the best WooCommerce Coupon plugin that elevates your promotional capabilities far beyond basic discount codes, giving you sophisticated tools to drive sales and reward customer loyalty. This plugin enables you to create store credit systems, gift certificates, and bulk coupon generation for targeted campaigns.")
    ),
    para(
      text("The ability to generate thousands of unique coupon codes in seconds makes large-scale promotions manageable, whether you're running influencer campaigns or seasonal sales. You can set up BOGO deals, cart-based discounts, and category-specific promotions with granular control over restrictions and usage limits.")
    ),
    para(
      text("This advanced coupon plugin displays available coupons prominently during checkout, reducing abandonment by reminding customers of savings opportunities. It also tracks coupon usage comprehensively, providing insights into which promotions drive the most revenue.")
    ),

    // Plugin 9: Germanized
    heading(3, "9. Germanized for WooCommerce"),
    para(
      text("Germanized for WooCommerce ensures your online store complies with German and European legal requirements, protecting you from costly legal issues while building customer trust. This plugin addresses the strict consumer protection laws in German-speaking markets by adding required legal pages, modifying checkout flows to meet regulations, and adjusting price displays to include VAT transparently.")
    ),
    para(
      text("It adds mandatory checkboxes for terms and conditions, provides proper cancellation policies, and generates legally compliant invoices automatically. The plugin supports delivery time displays, base price calculations for products sold by weight or volume, and photovoltaic registry integration for applicable businesses.")
    ),
    para(
      text("For businesses selling digital products, it handles the EU VAT rules correctly, applying appropriate tax rates based on customer location. The plugin receives regular updates to reflect changing legislation, ensuring ongoing compliance without constant manual oversight.")
    ),

    // Plugin 10: Marketing Automation
    heading(3, "10. WooCommerce Marketing Automation"),
    para(
      text("The marketing automation for ecommerce app enables store managers to maintain customer relationships through automated delivery of relevant messages. The system integrates three functions, which include email campaigns and lead capture tools and on-site popup triggers, to provide you with a complete solution that enables you to direct customers through their shopping process until they finish their purchase. The app enables automated customer behavior tracking sequences which help organizations maintain outreach consistency while improving their marketing performance.")
    ),
    para(
      text("You can create welcome flows that greet new subscribers with personalized messages, exclusive offers, or early incentives. The abandoned cart workflow system contacts users who left products behind to guide them back to their shopping cart for finalizing their purchase. Exit intent popups help capture leads at the moment they are about to leave, and targeted forms allow you to grow and segment your email list with precision. The drag-and-drop email builder enables users to create brand-compliant messages, while live previews provide users with delivery confidence before finalizing each message distribution.")
    ),
    para(
      text("The WooCommerce Marketing Automation app achieves three objectives through its integrated features, which eliminate duplicate work and facilitate continuous sales development while building customer relationships throughout all stages of the purchasing process. The system functions effectively for both small WooCommerce businesses and developing brands which require automated customer communication solutions that maintain operational simplicity.")
    ),

    // Plugin 11: WebYes Accessibility
    heading(3, "11. WebYes Accessibility Tool"),
    para(
      text("The WebYes Accessibility Tool for WordPress and WooCommerce stores creates better accessibility because it enables all visitors to access the site content. The accessibility toolbar allows users to change their reading and browsing experience by selecting different font sizes and contrast levels and cursor size and spacing options.")
    ),
    para(
      text("The plugin enables organizations to demonstrate compliance because it supports main accessibility standards which include WCAG 2.1 and ADA. The solution establishes genuine accessibility because it resolves back-end code problems while maintaining website performance unlike front-end accessibility widgets which use overlay systems.")
    ),
    para(
      text("The WebYes Accessibility Checker Chrome Extension provides developers and testers with a free tool, which enables them to perform fast accessibility tests on any website, based on WCAG standards. The tool enables you to discover common problems which include missing alt text and incorrect heading structures and low contrast, while allowing you to see elements currently on the screen and check image alt texts and observe keyboard focus sequence and evaluate performance in both desktop and mobile environments. The tool provides a lightweight solution for accessibility compliance.")
    ),

    // Plugin 12: WPForms
    heading(3, "12. WPForms"),
    para(
      text("WPForms brings powerful form-building capabilities to your WooCommerce store, enabling you to gather information, provide support, and engage customers beyond the standard checkout process. This drag-and-drop form builder requires no coding knowledge yet produces professional, responsive forms that work beautifully on all devices.")
    ),
    para(
      text("You can create contact forms for customer inquiries, survey forms to gather feedback, order forms for custom products, and registration forms for events or memberships. The conditional logic feature shows or hides fields based on previous answers, creating dynamic, personalized experiences that reduce friction.")
    ),
    para(
      text("Integration with email marketing services lets you build your subscriber list automatically as customers submit forms. The spam protection keeps your inbox clean without frustrating legitimate customers with complex CAPTCHAs. Form entries are stored in your WordPress database and can be viewed, exported, or processed directly from your dashboard. For WooCommerce specifically, you can create product inquiry forms, wholesale request forms, or custom quote requests that complement your standard purchasing options.")
    ),

    // Plugin 13: Gift Cards
    heading(3, "13. WooCommerce Gift Cards"),
    para(
      text("WooCommerce Gift Cards adds a proven revenue generator to your store while solving the common challenge customers face when buying for others with uncertain preferences. This plugin enables you to sell digital and physical gift cards that customers can purchase for themselves or send directly to recipients.")
    ),
    para(
      text("This gift card plugin provides customization options to let gift givers add personal messages, choose delivery dates, and select from attractive design templates that match your brand. Recipients receive gift cards via email with unique codes they can apply at checkout, and the balance tracking system handles partial redemptions automatically when the card value exceeds a single purchase amount.")
    ),
    para(
      text("You can set expiration dates, minimum and maximum amounts, and restrict gift cards to specific product categories or customer groups. The reporting features show gift card sales, redemption rates, and outstanding balances, providing valuable insights into this revenue stream. Physical gift card support means you can also sell cards in-store or include them with orders, bridging online and offline sales channels while expanding your market reach to customers who prefer gift cards over direct product purchases.")
    ),

    // Plugin 14: MonsterInsights
    heading(3, "14. MonsterInsights"),
    para(
      text("MonsterInsights bridges the gap between your WooCommerce store and Google Analytics, presenting complex data in an understandable format that drives better business decisions. This plugin automatically tracks eCommerce-specific metrics like transaction values, conversion rates, and product performance without requiring manual code insertion.")
    ),
    para(
      text("The dashboard reports appear directly in WordPress, eliminating the need to navigate Google Analytics' complex interface for routine checks. You can see which products generate the most revenue, which traffic sources convert best, and where customers abandon the purchase process.")
    ),
    para(
      text("Enhanced eCommerce tracking captures the complete customer journey from landing page through checkout completion, revealing optimization opportunities at each stage. The plugin respects GDPR and privacy regulations by offering anonymization options and consent management.")
    ),

    // Plugin 15: PDF Invoices
    heading(3, "15. WooCommerce PDF Invoices, Packing Slips and Credit Notes"),
    para(
      text("The PDF Invoices & Packing Slips for WooCommerce plugin professionalizes your order fulfillment and accounting processes by automatically generating essential documents for every transaction. This PDF invoice plugin creates customizable PDF invoices that include all legally required information, adding credibility to your business while simplifying tax compliance.")
    ),
    para(
      text("Customers can download invoices from their account pages or receive them automatically via email. The packing slip generation streamlines warehouse operations, providing clear picking and shipping instructions that minimize fulfillment errors.")
    ),
    para(
      text("For returns and refunds, credit note generation maintains proper financial records while giving customers the documentation they need. You can customize document templates to match your branding, adjusting layouts, colors, fonts, and included information fields. Sequential invoice numbering with customizable prefixes and formats meets various regional accounting requirements.")
    ),

    // Plugin 16: Yoast SEO
    heading(3, "16. Yoast SEO"),
    para(
      text("Yoast SEO gives your WooCommerce store the visibility it needs to attract organic traffic from search engines without paid advertising costs. This comprehensive SEO plugin analyzes every product page, category, and blog post, providing actionable recommendations to improve search rankings. If you're interested in learning more about optimizing your online presence, check out our "),
      link("blog", "https://www.thetutorbridge.com/blog"),
      text(" for helpful tips and guides.")
    ),
    para(
      text("The readability analysis ensures your product descriptions engage customers while satisfying search engine algorithms. You can optimize titles and meta descriptions for each page with live previews showing exactly how your store appears in search results. The XML sitemap generation helps search engines discover and index all your products quickly, while the breadcrumb implementation improves navigation and SEO simultaneously.")
    ),
    para(
      text("Schema markup support enables rich snippets in search results, potentially showing star ratings, prices, and availability directly in Google. The plugin prevents duplicate content issues common in eCommerce by managing canonical URLs automatically. Internal linking suggestions help you connect related products and content, improving both user experience and search engine understanding of your site structure.")
    ),

    // Plugin 17: Order Import Export
    heading(3, "17. Order Import Export for WooCommerce"),
    para(
      text("Order Import Export for WooCommerce streamlines order management when migrating stores, syncing with external systems, or processing bulk orders from wholesalers or B2B customers. This plugin handles the complete order data structure, including customer information, product details, shipping addresses, payment methods, and order statuses.")
    ),
    para(
      text("You can export orders to CSV, XML, or Excel file formats for accounting software, shipping services, or data analysis in external tools. The import functionality supports creating new orders programmatically, useful for processing orders received through other channels or for setting up demo stores with realistic data.")
    ),
    para(
      text("Field mapping ensures data from any source aligns correctly with WooCommerce's structure, preventing import errors and data loss. You can filter exports by date ranges, order status, or product categories, creating focused datasets for specific purposes. The plugin preserves order metadata, custom fields, and order notes during the transfer process. Scheduled imports and exports enable automatic data synchronization with third-party systems, reducing manual work and ensuring connected platforms stay updated with the latest order information.")
    ),

    // Plugin 18: Google Reviews
    heading(3, "18. Widgets for Google Reviews"),
    para(
      text("Widgets for Google Reviews leverage your hard-earned Google Business Profile reviews by displaying them prominently throughout your WooCommerce store. This plugin connects directly to Google's review platform, pulling in authentic customer feedback and presenting it in attractive, customizable widgets.")
    ),
    para(
      text("Displaying Google reviews on your website builds trust with potential customers who might not otherwise visit your Google Business Profile, converting that external social proof into on-site credibility. The widgets update automatically as you receive new reviews, keeping your displayed testimonials current without manual intervention.")
    ),
    para(
      text("You can showcase reviews in sidebars, footers, dedicated testimonial pages, or even on product pages to demonstrate overall business reliability. The customization options let you match the review display to your site's design, controlling colors, layouts, fonts, and which review elements to show.")
    ),
    para(
      text("Rating badges and summary statistics provide at-a-glance credibility indicators that influence purchasing decisions. The plugin can filter reviews by rating, showing only positive feedback or presenting a balanced mix depending on your strategy and the strength of your review profile.")
    ),

    // Plugin 19: GDPR Cookie Consent
    heading(3, "19. GDPR Cookie Consent"),
    para(
      text("GDPR Cookie Consent protects your business from substantial privacy regulation penalties while respecting visitor data rights across global markets. This plugin creates compliant cookie consent banners that meet GDPR, CCPA, and other privacy law requirements by clearly explaining what data you collect and obtaining proper consent before tracking begins.")
    ),
    para(
      text("The customizable banner design ensures the consent interface matches your brand while remaining prominent enough to meet legal standards. You can categorize cookies by type—necessary, functional, analytics, and advertising—giving visitors granular control over their privacy preferences.")
    ),
    para(
      text("This cookie compliance plugin automatically blocks cookies from loading until consent is granted, ensuring compliance from the first visitor interaction. This cookie consent solution supports multiple languages, automatically detecting visitors' locations and presenting notices in the appropriate language.")
    ),

    // Plugin 20: YITH Wishlist
    heading(3, "20. YITH WooCommerce Wishlist"),
    para(
      text("YITH WooCommerce Wishlist transforms window shopping into valuable customer data and future sales by letting visitors save products they're interested in for later consideration. This plugin adds a wishlist feature that increases engagement without requiring immediate purchase commitments, reducing pressure on hesitant buyers while keeping them connected to your store.")
    ),
    para(
      text("The social sharing functionality turns wishlists into marketing tools, as customers share desired products with friends and family who might purchase them as gifts. Email notifications alert customers when wishlist items go on sale or return to stock, creating timely purchasing opportunities that convert interest into revenue.")
    ),
    para(
      text("The wishlist data provides valuable insights into customer preferences and popular products, informing inventory decisions and marketing strategies. For registered users, wishlists persist across sessions and devices, creating continuity that unregistered shopping carts cannot provide. The plugin integrates seamlessly with your existing theme and checkout process, requiring minimal configuration while delivering maximum engagement and conversion benefits.")
    ),

    // Conclusion
    heading(2, "Conclusion"),
    para(
      text("Building a thriving online store isn't about adding every available tool—it's about selecting solutions that address your specific needs and work together harmoniously. The plugins covered in this guide represent tested solutions that thousands of store owners rely on to handle fundamental ecommerce challenges. From streamlining daily operations to enhancing customer experience and ensuring legal compliance, each tool serves a distinct purpose in your store's ecosystem.")
    ),
    para(
      text("As you implement these solutions, remember that the true power comes not from individual plugins but from how they work together to create a seamless experience for both you and your customers. Start with the essentials that address your most pressing challenges, then expand your toolkit as your store grows and your needs evolve.")
    ),
    para(
      text("Your WooCommerce store has immense potential. With the right combination of tools supporting your efforts, you'll spend less time managing technical details and more time focusing on what matters most—growing your business and serving your customers. The investment you make in quality plugins today will pay dividends in efficiency, revenue, and peace of mind for years to come. For more helpful resources and guides, visit our "),
      link("study resources", "https://www.thetutorbridge.com/study-resources"),
      text(" section or "),
      link("contact us", "https://www.thetutorbridge.com/contact"),
      text(" for personalized assistance.")
    )
  ]
};

// Blog post data
const blogPost = {
  title: "Best 20 WooCommerce Plugins for an eCommerce Store",
  slug: "best-20-woocommerce-plugins-for-an-ecommerce-store",
  content: content,
  excerpt: "Discover the essential WooCommerce plugins that can transform your online store into a powerful sales machine. From lead generation and product recommendations to payment processing and SEO optimization, these 20 must-have plugins address real challenges faced by ecommerce store owners.",
  featured_image: null, // Will be added later via admin panel
  author_name: "Rishabh Jain",
  author_linkedin: "https://www.linkedin.com/in/rishabh-jain-33b946214/",
  author_image: "Rishabh Jain.jpeg",
  tags: ["woocommerce", "ecommerce", "wordpress", "plugins", "online store", "business"],
  status: "published",
  published_at: new Date().toISOString(),
  meta_title: "Best 20 WooCommerce Plugins for an eCommerce Store | TheTutorBridge",
  meta_description: "Explore the top 20 WooCommerce plugins to boost your ecommerce store's performance. Learn about essential tools for lead generation, payments, SEO, and more.",
  meta_keywords: ["woocommerce plugins", "ecommerce plugins", "wordpress ecommerce", "online store tools", "woocommerce extensions"]
};

async function uploadBlogPost() {
  console.log('Uploading blog post to Supabase...');
  console.log('Title:', blogPost.title);
  console.log('Slug:', blogPost.slug);

  // Calculate read time
  const contentString = JSON.stringify(content);
  const wordCount = contentString.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);

  console.log('Content length:', contentString.length, 'characters');
  console.log('Estimated read time:', readTime, 'minutes');

  const postData = {
    ...blogPost,
    read_time: readTime
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([postData])
    .select()
    .single();

  if (error) {
    console.error('Error uploading blog post:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }

  console.log('\n✅ Blog post uploaded successfully!');
  console.log('Post ID:', data.id);
  console.log('Post URL: https://www.thetutorbridge.com/blog/' + data.slug);

  return data;
}

uploadBlogPost()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
