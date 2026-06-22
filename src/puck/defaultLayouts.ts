type PuckData = {
  content: Array<{ type: string; props: Record<string, unknown> }>
  root: { props: Record<string, unknown> }
}

export const defaultLayouts: Record<string, PuckData> = {

  home: {
    root: { props: { title: 'হোম পেজ' } },
    content: [
      {
        type: 'HomeSlidesBlock',
        props: {
          id: 'home-slider',
          slides: [
            { headingBn: 'প্যারাগন জৈব সার', tagBn: 'মাটির প্রাণ, কৃষকের আস্থা', tagEn: "Soul of Soil, Farmer's Trust", subtitleBn: 'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক জৈব সার — মাটির গঠন উন্নত করতে, উর্বরতা বাড়াতে এবং ফসলের স্বাভাবিক বৃদ্ধিতে কার্যকর।', imageUrl: '', bgColor: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)', accentColor: '#D4A017', cta1Label: 'আমাদের পণ্য দেখুন', cta1Href: '/products', cta2Label: 'আরও জানুন', cta2Href: '/about/our-story' },
            { headingBn: 'মাটি বাঁচান, ফসল বাড়ান', tagBn: 'মাটির স্বাস্থ্য রক্ষা করুন', tagEn: "Protect Your Soil's Health", subtitleBn: 'বারবার চাষ এবং রাসায়নিক সারের অতিরিক্ত ব্যবহারে ক্ষতিগ্রস্ত মাটিকে প্যারাগন জৈব সার দিয়ে পুনরুজ্জীবিত করুন।', imageUrl: '', bgColor: 'linear-gradient(135deg, #0d2438 0%, #1a3d2b 45%, #0F5132 100%)', accentColor: '#4CAF50', cta1Label: 'কীভাবে কাজ করে?', cta1Href: '/about/soil-benefit', cta2Label: 'ডিলার খুঁজুন', cta2Href: '/dealership' },
            { headingBn: 'হাজার কৃষকের বিশ্বাস', tagBn: 'বাংলাদেশের কৃষকদের পাশে', tagEn: 'Standing With Bangladeshi Farmers', subtitleBn: 'সারাদেশে হাজার হাজার কৃষক প্যারাগন জৈব সার ব্যবহার করে উৎপাদন বাড়াচ্ছেন এবং মাটির স্বাস্থ্য রক্ষা করছেন।', imageUrl: '', bgColor: 'linear-gradient(160deg, #1B4D3E 0%, #0F2E24 50%, #0a1a10 100%)', accentColor: '#D4A017', cta1Label: 'যোগাযোগ করুন', cta1Href: '/contact', cta2Label: 'ক্যারিয়ার', cta2Href: '/career' },
          ],
        },
      },
      {
        type: 'StatsSectionBlock',
        props: {
          id: 'home-stats',
          stat1ValueBn: '১০০%', stat1LabelBn: 'অর্গানিক জৈব সার', stat1LabelEn: 'Certified Organic',
          stat2ValueBn: '৫০০০+', stat2LabelBn: 'সন্তুষ্ট কৃষক', stat2LabelEn: 'Happy Farmers',
          stat3ValueBn: '১০+', stat3LabelBn: 'বছরের অভিজ্ঞতা', stat3LabelEn: 'Years Experience',
          stat4ValueBn: '৩টি', stat4LabelBn: 'প্রিমিয়াম পণ্য', stat4LabelEn: 'Premium Products',
        },
      },
      {
        type: 'AboutSectionBlock',
        props: {
          id: 'home-about',
          tagText: 'আমাদের সম্পর্কে',
          headingLine1: 'মাটিকে সুস্থ রাখুন,',
          highlightText: 'ফসল বাড়ান',
          bodyText: 'প্যারাগন জৈব সার উপকারী অণুজীব সমৃদ্ধ একটি ১০০% প্রাকৃতিক সার, যা বাংলাদেশের কৃষিজমির মাটির উর্বরতা পুনরুদ্ধার করতে এবং ফসলের স্বাভাবিক বৃদ্ধি নিশ্চিত করতে বিশেষভাবে তৈরি।',
          feature1: 'উপকারী অণুজীব সমৃদ্ধ প্রাকৃতিক উপাদান',
          feature2: 'মাটির জৈব পদার্থ বৃদ্ধি করে',
          feature3: 'ফসলের রোগ প্রতিরোধ ক্ষমতা বাড়ায়',
          feature4: 'রাসায়নিক সারের নির্ভরতা কমায়',
          ctaLabel: 'আমাদের গল্প জানুন', ctaHref: '/about/our-story',
          badgeValue: '১০০%', badgeLabel: 'প্রাকৃতিক উপাদান',
          imageUrl: '',
        },
      },
      {
        type: 'ProblemSectionBlock',
        props: {
          id: 'home-problem',
          tagText: 'সমস্যা ও সমাধান',
          headingBn: 'বাংলাদেশের মাটির সংকট ও',
          highlightText: 'আমাদের সমাধান',
          problemTitle: 'বাংলাদেশের মাটির উর্বরতা কেন কমছে?',
          prob1: 'বারবার চাষের ফলে মাটির জৈব পদার্থ হ্রাস পাচ্ছে',
          prob2: 'অতিরিক্ত রাসায়নিক সার ব্যবহারে মাটি অম্লীয় হয়ে পড়ছে',
          prob3: 'মাটির পানি ধারণ ক্ষমতা কমে যাচ্ছে',
          prob4: 'উপকারী অণুজীবের সংখ্যা উল্লেখযোগ্যভাবে কমছে',
          solutionTitle: 'প্যারাগন জৈব সার কীভাবে কাজ করে?',
          sol1: 'মাটিতে জৈব পদার্থ ও পুষ্টি উপাদান পুনরায় যোগ করে',
          sol2: 'উপকারী অণুজীব সরবরাহ করে মাটির জীবন ফিরিয়ে আনে',
          sol3: 'মাটির পানি ধারণ ও বায়ু চলাচল উন্নত করে',
          sol4: 'ফসলের উৎপাদন ৩০-৫০% পর্যন্ত বৃদ্ধি করতে সক্ষম',
        },
      },
      {
        type: 'HowItWorksBlock',
        props: {
          id: 'home-howitworks',
          tagText: 'ব্যবহারের পদ্ধতি', headingBn: 'মাত্র', highlightText: '৪টি ধাপে ফলন বাড়ান',
          step1No: '০১', step1Icon: '🌿', step1Title: 'প্রয়োগ করুন', step1En: 'Apply', step1Desc: 'জমি প্রস্তুতির সময় বা ফসল লাগানোর আগে প্যারাগন জৈব সার মাটিতে মিশিয়ে দিন।',
          step2No: '০২', step2Icon: '🔬', step2Title: 'অণুজীব সক্রিয় হয়', step2En: 'Microbes Activate', step2Desc: 'উপকারী অণুজীব মাটিতে সক্রিয় হয়ে জৈব পদার্থ বিশ্লেষণ শুরু করে এবং পুষ্টি সরবরাহ করে।',
          step3No: '০৩', step3Icon: '🌱', step3Title: 'মাটি সুস্থ হয়', step3En: 'Soil Recovers', step3Desc: 'মাটির গঠন, পানি ধারণ ক্ষমতা এবং জৈব পদার্থের পরিমাণ উল্লেখযোগ্যভাবে বৃদ্ধি পায়।',
          step4No: '০৪', step4Icon: '🌾', step4Title: 'ফলন বাড়ে', step4En: 'Yield Increases', step4Desc: 'সুস্থ মাটিতে ফসল দ্রুত ও শক্তিশালীভাবে বৃদ্ধি পায়, উৎপাদন ৩০-৫০% পর্যন্ত বৃদ্ধি পেতে পারে।',
        },
      },
      {
        type: 'ProductsPreviewBlock',
        props: {
          id: 'home-products',
          tagText: 'আমাদের পণ্যসমূহ', headingBn: 'প্রিমিয়াম', highlightText: 'কৃষি পণ্য', allProductsHref: '/products',
          p1Name: 'প্যারাগন জৈব সার', p1NameEn: 'Paragon Organic Fertilizer', p1Desc: 'উপকারী অণুজীব সমৃদ্ধ ১০০% অর্গানিক সার।', p1Weight: '৫০ কেজি', p1Icon: '🌿', p1Tag: 'সেরা বিক্রি', p1Gradient: 'linear-gradient(135deg, #1B4D3E 0%, #2D7A3A 100%)', p1Featured: true,
          p2Name: 'জৈব কীটনাশক', p2NameEn: 'Organic Pesticide', p2Desc: 'প্রাকৃতিক উপাদান দিয়ে তৈরি পরিবেশবান্ধব কীটনাশক।', p2Weight: '১ লিটার', p2Icon: '🌾', p2Tag: 'নতুন', p2Gradient: 'linear-gradient(135deg, #D4A017 0%, #F5C842 100%)',
          p3Name: 'মাটি উন্নয়নকারী', p3NameEn: 'Soil Improver', p3Desc: 'মাটির পিএইচ ঠিক রাখে এবং মাটির গঠন উন্নত করে।', p3Weight: '২৫ কেজি', p3Icon: '🏔️', p3Tag: 'জনপ্রিয়', p3Gradient: 'linear-gradient(135deg, #8B5E3C 0%, #C49A6C 100%)',
        },
      },
      {
        type: 'CTASectionBlock',
        props: {
          id: 'home-cta',
          tagText: 'আজই শুরু করুন',
          headingLine1: 'আপনার জমির মাটি',
          highlightText: 'সুস্থ করুন আজই',
          bodyText: 'প্যারাগন জৈব সার ব্যবহার করে আপনার ফসলের উৎপাদন বাড়ান এবং মাটির দীর্ঘমেয়াদী স্বাস্থ্য নিশ্চিত করুন।',
          cta1Label: 'এখনই যোগাযোগ করুন', cta1Href: '/contact',
          cta2Label: 'কল করুন', phone: '+8801700000000',
        },
      },
    ],
  },

  'about/our-story': {
    root: { props: { title: 'আমাদের গল্প' } },
    content: [
      {
        type: 'PageBannerBlock',
        props: {
          id: 'our-story-banner',
          tagText: 'Our Story',
          title: 'আমাদের',
          titleHighlight: 'গল্প',
          subtitle: 'প্যারাগন জৈব সারের যাত্রা — মাটির স্বাস্থ্য রক্ষায় এবং কৃষকের জীবনমান উন্নয়নের অঙ্গীকার নিয়ে শুরু হয়েছিল এই পথচলা।',
          bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
          align: 'left',
          breadcrumb1Label: 'আমাদের সম্পর্কে',
          breadcrumb1Href: '/about/our-story',
          breadcrumb2Label: 'আমাদের গল্প',
        },
      },
      {
        type: 'OurStoryFoundingBlock',
        props: {
          id: 'our-story-founding',
          tagText: 'The Beginning',
          heading: 'কীভাবে শুরু হয়েছিল',
          headingHighlight: 'আমাদের যাত্রা',
          para1: 'বাংলাদেশের কৃষিজমির মাটি দিন দিন তার উর্বরতা হারাচ্ছিল। দশকের পর দশক ধরে রাসায়নিক সারের অতিরিক্ত ব্যবহার এবং একই জমিতে বারবার চাষের কারণে মাটির জৈব পদার্থ ক্রমশ কমে যাচ্ছিল।',
          para2: 'এই সংকট উপলব্ধি করেই প্যারাগন গ্রুপের একদল বিজ্ঞানী ও কৃষি বিশেষজ্ঞ মাঠে নামলেন। বছরের পর বছর গবেষণার পর জন্ম নিল প্যারাগন জৈব সার — উপকারী অণুজীব সমৃদ্ধ বাংলাদেশের প্রথম সারির অর্গানিক কৃষি সমাধান।',
          missionTitle: 'আমাদের মিশন',
          missionText: 'মাটির স্বাস্থ্য রক্ষা করা ও কৃষকের জীবনমান উন্নয়ন — বাংলাদেশের কৃষিজমির উর্বরতা পুনরুদ্ধার করা এবং রাসায়নিক সারের উপর নির্ভরশীলতা ক্রমশ কমিয়ে আনা।',
          visionTitle: 'আমাদের ভিশন',
          visionText: 'রাসায়নিকমুক্ত বাংলাদেশ গড়া — ২০৩০ সালের মধ্যে বাংলাদেশের প্রতিটি জেলায় কৃষকদের কাছে জৈব কৃষির সুবিধা পৌঁছে দেওয়া।',
        },
      },
      {
        type: 'OurStoryTimelineBlock',
        props: {
          id: 'our-story-timeline',
          tagText: 'Journey',
          heading: 'আমাদের',
          headingHighlight: 'যাত্রাপথ',
          items: [
            { year: '২০১০', title: 'প্যারাগন গ্রুপের দৃষ্টিভঙ্গি', desc: 'বাংলাদেশের শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান প্যারাগন গ্রুপ কৃষিখাতে টেকসই সমাধান নিয়ে আসার সিদ্ধান্ত নেয়।' },
            { year: '২০১৩', title: 'প্রথম পণ্য বাজারে', desc: 'দীর্ঘ গবেষণার পর প্যারাগন জৈব সার প্রথমবারের মতো বাজারে আসে এবং কৃষকদের মধ্যে ব্যাপক সাড়া ফেলে।' },
            { year: '২০১৬', title: '৬৪ জেলায় বিস্তার', desc: 'ডিলার নেটওয়ার্ক প্রসারিত হয়ে সারাবাংলাদেশে ৬৪ জেলায় পণ্য পৌঁছে দেওয়া সম্ভব হয়।' },
            { year: '২০১৯', title: 'আন্তর্জাতিক স্বীকৃতি', desc: 'আন্তর্জাতিক মানের জৈব সার হিসেবে স্বীকৃতি পায় এবং রপ্তানির দ্বার উন্মোচিত হয়।' },
            { year: '২০২৩', title: 'নতুন গবেষণা কেন্দ্র', desc: 'অত্যাধুনিক গবেষণা কেন্দ্র প্রতিষ্ঠার মাধ্যমে নতুন প্রজন্মের জৈব সার তৈরির কাজ শুরু হয়।' },
          ],
        },
      },
      {
        type: 'OurStoryValuesBlock',
        props: {
          id: 'our-story-values',
          tagText: 'Our Values',
          heading: 'আমাদের',
          headingHighlight: 'মূল্যবোধ',
          values: [
            { icon: '🌿', title: 'পরিবেশবান্ধবতা', desc: 'প্রতিটি পদক্ষেপে পরিবেশ ও মাটির স্বাস্থ্য রক্ষাকে সর্বোচ্চ অগ্রাধিকার দেওয়া হয়।' },
            { icon: '🎯', title: 'মানের প্রতি অঙ্গীকার', desc: 'সর্বোচ্চ মানের কাঁচামাল ও বৈজ্ঞানিক প্রক্রিয়ায় প্রতিটি পণ্য তৈরি করা হয়।' },
            { icon: '❤️', title: 'কৃষকের প্রতি দায়বদ্ধতা', desc: 'আমাদের প্রতিটি সিদ্ধান্তের কেন্দ্রে থাকেন বাংলাদেশের কৃষক ও তার পরিবার।' },
            { icon: '👁️', title: 'স্বচ্ছতা', desc: 'পণ্যের উপাদান, প্রক্রিয়া ও মূল্য নির্ধারণে সম্পূর্ণ স্বচ্ছতা বজায় রাখা হয়।' },
          ],
          ctaTitle: 'আজই',
          ctaHighlight: 'যোগাযোগ করুন',
          ctaText: 'আমাদের সাথে যোগাযোগ করুন এবং জৈব কৃষির যাত্রায় যোগ দিন।',
          ctaBtn1Label: 'যোগাযোগ করুন',
          ctaBtn1Href: '/contact',
          ctaBtn2Label: 'মাটির উপকার জানুন',
          ctaBtn2Href: '/about/soil-benefit',
        },
      },
    ],
  },

  'about/soil-benefit': {
    root: { props: { title: 'মাটির উপকার' } },
    content: [
      {
        type: 'PageBannerBlock',
        props: {
          id: 'soil-benefit-banner',
          tagText: 'Soil Benefit',
          title: 'মাটির',
          titleHighlight: 'উপকার',
          subtitle: 'জৈব সার কীভাবে মাটিকে সুস্থ রাখে এবং ফসলের উৎপাদন বাড়ায় — জানুন বিজ্ঞানের ভাষায়।',
          bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
          align: 'left',
          breadcrumb1Label: 'আমাদের সম্পর্কে',
          breadcrumb1Href: '/about/our-story',
          breadcrumb2Label: 'মাটির উপকার',
        },
      },
      {
        type: 'SoilProblemBlock',
        props: {
          id: 'soil-problem',
          tagText: 'The Crisis',
          heading: 'বাংলাদেশের মাটির',
          headingHighlight: 'ক্রমবর্ধমান সংকট',
          subtitle: 'বছরের পর বছর রাসায়নিক সার ও কীটনাশকের অতিরিক্ত ব্যবহারে বাংলাদেশের কৃষিজমির মাটি তার প্রাকৃতিক উর্বরতা হারাচ্ছে।',
          problems: [
            { icon: '🌾', title: 'জৈব পদার্থ হ্রাস', desc: 'বারবার চাষের ফলে মাটির জৈব পদার্থ দ্রুত কমে যাচ্ছে, যা মাটির উর্বরতার মূল ভিত্তি।' },
            { icon: '⚗️', title: 'অম্লীয় মাটি', desc: 'অতিরিক্ত রাসায়নিক সার ব্যবহারে মাটির pH কমে গিয়ে অম্লীয় হয়ে পড়ছে।' },
            { icon: '💧', title: 'পানি ধারণ ক্ষমতা হ্রাস', desc: 'মাটির গঠন ক্ষতিগ্রস্ত হওয়ায় পানি ধারণ ও বায়ু চলাচল উভয়ই কমে যাচ্ছে।' },
            { icon: '🦠', title: 'অণুজীব ধ্বংস', desc: 'উপকারী ব্যাকটেরিয়া ও ছত্রাক বিনাশ পেয়ে মাটি "মৃত" হয়ে পড়ছে।' },
          ],
          statNumber: '৬০%+ জমিতে',
          statLabel: 'বাংলাদেশের কৃষিজমির',
          statDesc: 'জৈব পদার্থের পরিমাণ বিপদজনকভাবে কম',
        },
      },
      {
        type: 'SoilBenefitCardsBlock',
        props: {
          id: 'soil-benefits',
          tagText: 'Solution',
          heading: 'জৈব সার কীভাবে',
          headingHighlight: 'মাটি সুস্থ রাখে',
          benefits: [
            { icon: '💧', title: 'পানি ধারণ বৃদ্ধি', titleEn: 'Water Retention', desc: 'জৈব পদার্থ মাটির পানি ধারণ ক্ষমতা ৩০-৫০% বৃদ্ধি করে, ফলে সেচের পরিমাণ কমে।', stat: '৪০%+', statLabel: 'পানি ধারণ বৃদ্ধি' },
            { icon: '💨', title: 'মাটির গঠন উন্নতি', titleEn: 'Soil Structure', desc: 'মাটির কণাগুলো একত্রিত হয়ে ভালো গঠন তৈরি হয়, শিকড় সহজে মাটির গভীরে যেতে পারে।', stat: '৬০%+', statLabel: 'গঠন উন্নতি' },
            { icon: '🦠', title: 'উপকারী অণুজীব', titleEn: 'Beneficial Microbes', desc: 'লক্ষ লক্ষ উপকারী ব্যাকটেরিয়া ও ছত্রাক মাটিতে যুক্ত হয়ে পুষ্টি সরবরাহ করে।', stat: '১০x', statLabel: 'অণুজীব বৃদ্ধি' },
            { icon: '⚡', title: 'পুষ্টি সরবরাহ', titleEn: 'Nutrient Supply', desc: 'নাইট্রোজেন, ফসফরাস, পটাশিয়ামসহ ১৬টি প্রয়োজনীয় পুষ্টি উপাদান ধীরে ধীরে সরবরাহ করে।', stat: '১৬টি', statLabel: 'পুষ্টি উপাদান' },
          ],
        },
      },
      {
        type: 'SoilHowItWorksBlock',
        props: {
          id: 'soil-how-it-works',
          tagText: 'How It Works',
          heading: 'কীভাবে কাজ করে',
          headingHighlight: 'প্যারাগন জৈব সার?',
          steps: [
            { no: '০১', title: 'মাটিতে মিশানো', desc: 'জমি তৈরির সময় বা বীজ বপনের আগে প্যারাগন জৈব সার মাটিতে মিশিয়ে দিন। প্রতি বিঘায় ১৫-২০ কেজি ব্যবহার করুন।' },
            { no: '০২', title: 'অণুজীব সক্রিয়', desc: 'পানির সংস্পর্শে এলে উপকারী অণুজীব সক্রিয় হয় এবং জৈব পদার্থ ভাঙ্গতে শুরু করে।' },
            { no: '০৩', title: 'পুষ্টি নিঃসরণ', desc: 'ধীরে ধীরে পুষ্টি উপাদান নিঃসরণ হয়, গাছের শিকড় সহজে শোষণ করতে পারে।' },
            { no: '০৪', title: 'মাটি পুনরুজ্জীবিত', desc: 'নিয়মিত ব্যবহারে মাটির জৈব পদার্থ বৃদ্ধি পায় এবং মাটির সামগ্রিক স্বাস্থ্য উন্নত হয়।' },
          ],
        },
      },
      {
        type: 'SoilComparisonBlock',
        props: {
          id: 'soil-comparison',
          tagText: 'Comparison',
          heading: 'জৈব বনাম',
          headingHighlight: 'রাসায়নিক সার',
          rows: [
            { label: 'পুষ্টি সরবরাহ', organic: 'ধীরে ধীরে, দীর্ঘস্থায়ী', chemical: 'দ্রুত কিন্তু স্বল্পস্থায়ী' },
            { label: 'মাটির স্বাস্থ্য', organic: 'উন্নত করে', chemical: 'ক্রমশ ক্ষতি করে' },
            { label: 'উপকারী অণুজীব', organic: 'বৃদ্ধি পায়', chemical: 'ধ্বংস হয়' },
            { label: 'পরিবেশ প্রভাব', organic: 'পরিবেশবান্ধব', chemical: 'পানি ও মাটি দূষণ' },
            { label: 'দীর্ঘমেয়াদী ফলন', organic: 'ক্রমাগত বাড়ে', chemical: 'ক্রমশ কমে' },
            { label: 'উৎপাদন খরচ', organic: 'দীর্ঘমেয়াদে কম', chemical: 'বাড়তে থাকে' },
          ],
          ctaTitle: 'আপনার জমির মাটি',
          ctaHighlight: 'পরীক্ষা করুন',
          ctaBtn1Label: 'বিনামূল্যে পরামর্শ নিন',
          ctaBtn1Href: '/contact',
          ctaBtn2Label: 'কেন এই পণ্য বেছে নেবেন?',
          ctaBtn2Href: '/about/why-this-product',
        },
      },
    ],
  },

  'about/why-this-product': {
    root: { props: { title: 'কেন এই পণ্য?' } },
    content: [
      {
        type: 'PageBannerBlock',
        props: {
          id: 'why-product-banner',
          tagText: 'Why Choose Us',
          title: 'কেন এই',
          titleHighlight: 'পণ্য বেছে নেবেন?',
          subtitle: 'বিজ্ঞানসম্মত ফর্মুলা, প্রমাণিত ফলাফল এবং হাজার কৃষকের বিশ্বাস — এটাই প্যারাগন জৈব সারের পার্থক্য।',
          bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
          align: 'left',
          breadcrumb1Label: 'আমাদের সম্পর্কে',
          breadcrumb1Href: '/about/our-story',
          breadcrumb2Label: 'কেন এই পণ্য?',
        },
      },
      {
        type: 'WhyUSPBlock',
        props: {
          id: 'why-usp',
          tagText: 'Key Advantages',
          heading: 'আমাদের পণ্যের',
          headingHighlight: 'অনন্য বৈশিষ্ট্য',
          usps: [
            { icon: '🛡️', title: '১০০% জৈব ও নিরাপদ', titleEn: 'Certified Organic', desc: 'কোনো ক্ষতিকর রাসায়নিক উপাদান নেই। সম্পূর্ণ প্রাকৃতিক কাঁচামাল থেকে তৈরি, মানুষ, প্রাণী ও পরিবেশের জন্য সম্পূর্ণ নিরাপদ।', color: '#1B4D3E' },
            { icon: '🏆', title: 'বিজ্ঞানসম্মত ফর্মুলা', titleEn: 'Scientific Formula', desc: 'বাংলাদেশের মাটির বিশেষ চাহিদা বিশ্লেষণ করে তৈরি। কৃষি গবেষণা প্রতিষ্ঠানের সাথে সহযোগিতায় উদ্ভাবিত ফর্মুলা।', color: '#2D7A3A' },
            { icon: '📈', title: 'প্রমাণিত ফলাফল', titleEn: 'Proven Results', desc: 'হাজার হাজার কৃষকের মাঠে পরীক্ষিত ও প্রমাণিত। গড়ে ৩০-৫০% উৎপাদন বৃদ্ধির রেকর্ড।', color: '#D4A017' },
            { icon: '👥', title: 'বিশেষজ্ঞ পরামর্শ সেবা', titleEn: 'Expert Support', desc: 'প্রশিক্ষিত কৃষি বিশেষজ্ঞদের দল সবসময় আপনার পাশে। বিনামূল্যে পরামর্শ সেবা পাওয়া যায়।', color: '#1B4D3E' },
          ],
          specTitle: 'পণ্যের',
          specHighlight: 'গুণগত মান',
          specBody: 'প্রতিটি ব্যাচ কঠোর মান নিয়ন্ত্রণের মধ্য দিয়ে যায়। বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) অনুমোদিত পদ্ধতিতে পরীক্ষিত।',
          specs: [
            { label: 'উপকারী ব্যাকটেরিয়া', value: '৫+ কোটি/গ্রাম' },
            { label: 'জৈব পদার্থ', value: '৪০%+' },
            { label: 'পিএইচ রেঞ্জ', value: '৬.৫ – ৭.৫' },
            { label: 'নাইট্রোজেন (N)', value: '১.৮%+' },
            { label: 'ফসফরাস (P)', value: '১.২%+' },
            { label: 'পটাশিয়াম (K)', value: '১.৫%+' },
          ],
          trustPoints: [
            { text: 'বাস্তব মাঠ পরীক্ষায় ফলাফল প্রমাণিত' },
            { text: 'প্যারাগন গ্রুপের বিশ্বস্ত ব্র্যান্ড' },
            { text: 'দেশীয় কৃষি বিশেষজ্ঞদের তত্ত্বাবধানে তৈরি' },
            { text: 'সারাদেশে সহজলভ্য ডিলার নেটওয়ার্ক' },
            { text: 'বিক্রয়োত্তর সেবা ও পরামর্শ' },
          ],
          trustStats: [
            { value: '৫০০০+', label: 'কৃষক' },
            { value: '৩০-৫০%', label: 'ফলন বৃদ্ধি' },
            { value: '১০+', label: 'বছরের গবেষণা' },
          ],
        },
      },
      {
        type: 'WhyTestimonialsBlock',
        props: {
          id: 'why-testimonials',
          tagText: 'Testimonials',
          heading: 'কৃষকদের',
          headingHighlight: 'অভিজ্ঞতা',
          testimonials: [
            { name: 'মো. আব্দুর রহমান', location: 'ময়মনসিংহ', role: 'ধান চাষি', text: 'প্যারাগন জৈব সার ব্যবহারের পর আমার ধানের ফলন ৪০% বেড়ে গেছে। মাটিও অনেক ভালো হয়েছে। এখন রাসায়নিক সার কম লাগে।', emoji: '🌾', years: '৩ বছর ধরে ব্যবহার করছেন' },
            { name: 'কামরুন নাহার', location: 'রাজশাহী', role: 'সবজি চাষি', text: 'আমার সবজি বাগানে এখন কোনো রাসায়নিক সার দিই না। প্যারাগন জৈব সারেই মাটি সুস্থ থাকে। সবজিও তাজা থাকে বেশিদিন।', emoji: '🥬', years: '২ বছর ধরে ব্যবহার করছেন' },
            { name: 'মো. জামাল উদ্দিন', location: 'কুমিল্লা', role: 'আম চাষি', text: 'আমের বাগানে প্যারাগন জৈব সার দেওয়ার পর গাছগুলো অনেক সতেজ দেখাচ্ছে। ফলও বেশি হচ্ছে এবং মিষ্টি হচ্ছে।', emoji: '🥭', years: '৪ বছর ধরে ব্যবহার করছেন' },
          ],
          ctaTitle: 'আজই শুরু করুন',
          ctaHighlight: 'জৈব কৃষির যাত্রা',
          ctaBtn1Label: 'ডিলার খুঁজুন',
          ctaBtn1Href: '/dealership',
          ctaBtn2Label: 'সরাসরি যোগাযোগ করুন',
          ctaBtn2Href: '/contact',
        },
      },
    ],
  },

  'about/paragon-group': {
    root: { props: { title: 'প্যারাগন গ্রুপ' } },
    content: [
      {
        type: 'PageBannerBlock',
        props: {
          id: 'paragon-group-banner',
          tagText: 'Paragon Group',
          title: 'প্যারাগন',
          titleHighlight: 'গ্রুপ',
          subtitle: 'বাংলাদেশের অন্যতম শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান — তিন দশকের অভিজ্ঞতা ও বিশ্বাসের সাথে।',
          bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
          align: 'left',
          breadcrumb1Label: 'আমাদের সম্পর্কে',
          breadcrumb1Href: '/about/our-story',
          breadcrumb2Label: 'প্যারাগন গ্রুপ',
        },
      },
      {
        type: 'ParagonAboutBlock',
        props: {
          id: 'paragon-about',
          tagText: 'About Paragon Group',
          heading: 'বাংলাদেশের',
          headingHighlight: 'একটি বিশ্বস্ত নাম',
          para1: 'প্যারাগন গ্রুপ বাংলাদেশের অন্যতম শীর্ষস্থানীয় শিল্প প্রতিষ্ঠান। তিন দশকেরও বেশি সময় ধরে পোলট্রি, খাদ্য প্রক্রিয়াজাতকরণ, কৃষি এবং লজিস্টিক্স খাতে সফলভাবে কাজ করে আসছে।',
          para2: 'দেশের কৃষিখাতে টেকসই পরিবর্তন আনার লক্ষ্যে প্যারাগন গ্রুপ জৈব সার উৎপাদনে বিনিয়োগ করে। আমাদের বিশ্বাস, সুস্থ মাটিই বাংলাদেশের খাদ্য নিরাপত্তার মূল ভিত্তি।',
          para3: 'প্যারাগন গ্রুপের পোলট্রি বিভাগ থেকে প্রাপ্ত জৈব উপজাত এবং আধুনিক জৈবপ্রযুক্তি ব্যবহার করে তৈরি হয় প্যারাগন জৈব সার।',
          stats: [
            { icon: '🏢', value: '৩০+', label: 'বছরের অভিজ্ঞতা', dark: true },
            { icon: '👥', value: '৫০০০+', label: 'কর্মসংস্থান', dark: false },
            { icon: '🌐', value: '১৫+', label: 'ব্যবসায়িক শাখা', dark: true },
            { icon: '🏆', value: '৬৪', label: 'জেলায় উপস্থিতি', dark: false },
          ],
        },
      },
      {
        type: 'ParagonBusinessesBlock',
        props: {
          id: 'paragon-businesses',
          tagText: 'Group Companies',
          heading: 'প্যারাগন গ্রুপের',
          headingHighlight: 'ব্যবসায়িক শাখা',
          businesses: [
            { emoji: '🐔', name: 'প্যারাগন পোলট্রি', nameEn: 'Paragon Poultry', desc: 'বাংলাদেশের অন্যতম বৃহত্তম পোলট্রি ফার্ম। মুরগি, হ্যাচারি ও ফিড উৎপাদনে শীর্ষস্থানীয়।', featured: false },
            { emoji: '🌾', name: 'প্যারাগন জৈব সার', nameEn: 'Paragon Organic Fertilizer', desc: 'টেকসই কৃষির জন্য উপকারী অণুজীব সমৃদ্ধ জৈব সার উৎপাদন ও বিপণন।', featured: true },
            { emoji: '🏭', name: 'প্যারাগন ফিড মিল', nameEn: 'Paragon Feed Mill', desc: 'উচ্চমানের পোলট্রি ও মৎস্য খাদ্য উৎপাদনে অগ্রণী ভূমিকা রাখছে।', featured: false },
            { emoji: '🥩', name: 'প্যারাগন ফুডস', nameEn: 'Paragon Foods', desc: 'প্রক্রিয়াজাত মাংস ও খাদ্যপণ্যের বাজারে নির্ভরযোগ্য ব্র্যান্ড।', featured: false },
            { emoji: '🚚', name: 'প্যারাগন লজিস্টিক্স', nameEn: 'Paragon Logistics', desc: 'সারাদেশে পণ্য পরিবহন ও সরবরাহ শৃঙ্খল পরিচালনায় দক্ষ।', featured: false },
            { emoji: '🌐', name: 'প্যারাগন এক্সপোর্ট', nameEn: 'Paragon Export', desc: 'আন্তর্জাতিক বাজারে বাংলাদেশি কৃষিপণ্য রপ্তানিতে সক্রিয় ভূমিকা।', featured: false },
          ],
        },
      },
      {
        type: 'ParagonWhyOrganicBlock',
        props: {
          id: 'paragon-why-organic',
          tagText: 'Our Commitment',
          heading: 'কেন আমরা',
          headingHighlight: 'জৈব কৃষিতে বিনিয়োগ করলাম?',
          reasons: [
            { title: 'পোলট্রি শিল্পের দায়িত্ব', text: 'প্যারাগন গ্রুপের পোলট্রি বিভাগ থেকে প্রতিদিন বিপুল পরিমাণ জৈব উপজাত তৈরি হয়। এই উপজাতকে মাটির সুস্বাস্থ্যের জন্য ব্যবহার করাই আমাদের circular economy-র অংশ।' },
            { title: 'কৃষকের প্রয়োজনীয়তা', text: 'বাংলাদেশের কৃষকরা মাটির উর্বরতা হ্রাসের সমস্যায় ভুগছিলেন। তাদের একটি কার্যকর ও সাশ্রয়ী সমাধান দেওয়াই ছিল আমাদের লক্ষ্য।' },
            { title: 'পরিবেশগত দায়বদ্ধতা', text: 'রাসায়নিক সারের অতিরিক্ত ব্যবহার পরিবেশ দূষণ করছে। আমরা একটি পরিবেশবান্ধব বিকল্প তৈরি করতে চেয়েছিলাম যা একই সাথে কার্যকর এবং টেকসই।' },
            { title: 'জাতীয় খাদ্য নিরাপত্তা', text: 'বাংলাদেশের ক্রমবর্ধমান জনগোষ্ঠীর খাদ্য নিরাপত্তা নিশ্চিত করতে হলে মাটির উর্বরতা বজায় রাখা অপরিহার্য। এটি আমাদের জাতীয় দায়িত্ব।' },
          ],
          ctaTitle: 'প্যারাগন পরিবারের',
          ctaHighlight: 'অংশ হন',
          ctaBtn1Label: 'ডিলারশিপ সম্পর্কে জানুন',
          ctaBtn1Href: '/dealership',
          ctaBtn2Label: 'যোগাযোগ করুন',
          ctaBtn2Href: '/contact',
        },
      },
    ],
  },

  location: {
    root: { props: { title: 'ডিলারশিপ ও অবস্থান' } },
    content: [
      {
        type: 'PageBannerBlock',
        props: {
          id: 'location-banner',
          tagText: 'Dealership',
          title: 'ডিলারশিপ ও',
          titleHighlight: 'অবস্থান',
          subtitle: 'সারাবাংলাদেশে আমাদের ডিলার নেটওয়ার্ক — আপনার কাছের ডিলার খুঁজুন অথবা ডিলারশিপের জন্য আবেদন করুন।',
          bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
          align: 'left',
          breadcrumb1Label: 'ডিলারশিপ',
          breadcrumb1Href: '',
          breadcrumb2Label: '',
        },
      },
      {
        type: 'LocationCoverageBlock',
        props: {
          id: 'location-coverage',
          tagText: 'Coverage Area',
          heading: 'সারাবাংলাদেশে',
          headingHighlight: 'আমাদের উপস্থিতি',
          subtitle: 'দেশের সকল বিভাগে আমাদের ডিলার নেটওয়ার্ক সক্রিয়। নতুন এলাকায় ডিলার নিয়োগ প্রক্রিয়া চলমান।',
          statTiles: [
            { value: '৬৪', label: 'জেলা' },
            { value: '৮', label: 'বিভাগ' },
            { value: '৫০০+', label: 'সক্রিয় ডিলার' },
            { value: 'সারাদেশ', label: 'কভারেজ' },
          ],
          areas: [
            { division: 'ঢাকা বিভাগ', districts: 'ঢাকা, গাজীপুর, মানিকগঞ্জ, নারায়ণগঞ্জ, টাঙ্গাইল, কিশোরগঞ্জ, ময়মনসিংহ' },
            { division: 'চট্টগ্রাম বিভাগ', districts: 'চট্টগ্রাম, কুমিল্লা, নোয়াখালী, ফেনী, ব্রাহ্মণবাড়িয়া, চাঁদপুর, লক্ষ্মীপুর' },
            { division: 'রাজশাহী বিভাগ', districts: 'রাজশাহী, বগুড়া, নাটোর, চাঁপাইনবাবগঞ্জ, পাবনা, সিরাজগঞ্জ, নওগাঁ' },
            { division: 'খুলনা বিভাগ', districts: 'খুলনা, যশোর, সাতক্ষীরা, বাগেরহাট, নড়াইল, মাগুরা, ঝিনাইদহ, কুষ্টিয়া' },
            { division: 'বরিশাল বিভাগ', districts: 'বরিশাল, পটুয়াখালী, ভোলা, পিরোজপুর, বরগুনা, ঝালকাঠি' },
            { division: 'সিলেট বিভাগ', districts: 'সিলেট, মৌলভীবাজার, হবিগঞ্জ, সুনামগঞ্জ' },
            { division: 'রংপুর বিভাগ', districts: 'রংপুর, দিনাজপুর, গাইবান্ধা, নীলফামারী, কুড়িগ্রাম, ঠাকুরগাঁও, পঞ্চগড়' },
            { division: 'ময়মনসিংহ বিভাগ', districts: 'ময়মনসিংহ, জামালপুর, শেরপুর, নেত্রকোণা' },
          ],
        },
      },
      {
        type: 'LocationDealerBenefitsBlock',
        props: {
          id: 'location-benefits',
          tagText: 'Why Become A Dealer',
          heading: 'কেন হবেন',
          headingHighlight: 'আমাদের ডিলার?',
          subtitle: 'কৃষকদের কাছে ক্রমবর্ধমান জৈব সারের চাহিদা কাজে লাগিয়ে আপনার ব্যবসা গড়ে তুলুন।',
          benefits: [
            { icon: '🏢', title: 'বিশ্বস্ত ব্র্যান্ড সাপোর্ট', desc: 'প্যারাগন গ্রুপের শক্তিশালী ব্র্যান্ড পরিচিতি আপনার ব্যবসাকে এগিয়ে নিয়ে যাবে। বিজ্ঞাপন ও প্রচারণায় আমরা পাশে থাকব।' },
            { icon: '📈', title: 'লাভজনক ব্যবসার সুযোগ', desc: 'প্রতিযোগিতামূলক মূল্য ও আকর্ষণীয় কমিশনে পণ্য সরবরাহ। দীর্ঘমেয়াদী অংশীদারিত্বে লাভজনক ব্যবসা পরিচালনা।' },
            { icon: '👥', title: 'প্রশিক্ষণ ও উন্নয়ন', desc: 'নিয়মিত প্রশিক্ষণ, কৃষক সমাবেশ ও মার্কেটিং সহায়তা প্রদান করা হয়। আপনার দলকে আমরা দক্ষ করে তুলব।' },
            { icon: '🤝', title: 'দীর্ঘমেয়াদী অংশীদারিত্ব', desc: 'আমরা শুধু পণ্য বিক্রেতা খুঁজি না, প্রকৃত অংশীদার খুঁজি। আপনার সাফল্যই আমাদের সাফল্য।' },
          ],
        },
      },
      {
        type: 'LocationApplicationBlock',
        props: {
          id: 'location-apply',
          tagText: 'Apply Now',
          heading: 'ডিলারশিপের জন্য',
          headingHighlight: 'আবেদন করুন',
          requirements: [
            { text: 'নাম ও প্রতিষ্ঠানের নাম' },
            { text: 'যোগাযোগের মোবাইল নম্বর' },
            { text: 'ব্যবসার ঠিকানা (জেলা, উপজেলা)' },
            { text: 'সংক্ষিপ্ত ব্যবসায়িক অভিজ্ঞতার বিবরণ' },
            { text: 'কৃষি পণ্য বা সার ব্যবসার পূর্ব অভিজ্ঞতা (থাকলে)' },
          ],
          phone: '+880 1324-413282',
          email: 'info.fertilizer@paragon.com.bd',
          formTitle: 'আবেদন ফর্ম',
          formSuccessTitle: 'আবেদন সফলভাবে জমা হয়েছে!',
          formSuccessText: 'আমাদের টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে। ধন্যবাদ আপনার আগ্রহের জন্য।',
          submitLabel: 'আবেদন জমা দিন',
        },
      },
    ],
  },

  career: {
    root: { props: { title: 'ক্যারিয়ার' } },
    content: [
      {
        type: 'PageBannerBlock',
        props: {
          id: 'career-banner',
          tagText: 'Career',
          title: 'আমাদের সাথে',
          titleHighlight: 'ক্যারিয়ার গড়ুন',
          subtitle: 'প্যারাগন জৈব সারের সাথে যোগ দিন এবং টেকসই কৃষির যাত্রায় অবদান রাখুন।',
          bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
          align: 'left',
          breadcrumb1Label: 'ক্যারিয়ার',
          breadcrumb1Href: '',
          breadcrumb2Label: '',
        },
      },
      {
        type: 'CareerWhyJoinBlock',
        props: {
          id: 'career-why-join',
          tagText: 'Why Join Us',
          heading: 'কেন আমাদের সাথে',
          headingHighlight: 'কাজ করবেন?',
          subtitle: 'আমরা শুধু চাকরি দিই না — একটি উদ্দেশ্যমুখী ক্যারিয়ার গড়ার সুযোগ দিই।',
          cards: [
            { icon: '💼', title: 'শীর্ষস্থানীয় প্রতিষ্ঠান', desc: 'বাংলাদেশের অন্যতম নেতৃস্থানীয় কৃষি-শিল্প প্রতিষ্ঠানে কর্মসংস্থানের সুযোগ।' },
            { icon: '🌿', title: 'পরিবেশ রক্ষায় অবদান', desc: 'আপনার কাজ সরাসরি মাটির স্বাস্থ্য রক্ষায় এবং পরিবেশবান্ধব কৃষির প্রসারে ভূমিকা রাখবে।' },
            { icon: '📈', title: 'পেশাদার উন্নয়ন', desc: 'নিয়মিত প্রশিক্ষণ, কর্মশালা এবং ক্যারিয়ার উন্নয়নের সুযোগ প্রদান করা হয়।' },
            { icon: '👥', title: 'প্রাণবন্ত পরিবেশ', desc: 'তরুণ, উদ্ভাবনী ও বৈচিত্র্যময় দলের সাথে কাজ করার সুযোগ।' },
          ],
        },
      },
      {
        type: 'CareerFieldsBlock',
        props: {
          id: 'career-fields',
          tagText: 'Open Positions',
          heading: 'কোন কোন',
          headingHighlight: 'বিভাগে সুযোগ আছে?',
          subtitle: 'আমরা বিভিন্ন বিভাগে প্রতিভাবান, উদ্যমী ও অভিজ্ঞ মানুষদের খুঁজছি।',
          fields: [
            { icon: '🌱', title: 'জৈব সার উৎপাদন', desc: 'উৎপাদন প্রক্রিয়া, মান নিয়ন্ত্রণ ও গবেষণায় দক্ষ প্রার্থী।' },
            { icon: '🔬', title: 'কৃষি ও মৃত্তিকাবিজ্ঞান', desc: 'কৃষিবিদ, মৃত্তিকাবিজ্ঞানী ও উদ্ভিদবিজ্ঞানী।' },
            { icon: '✅', title: 'গুণমান নিয়ন্ত্রণ', desc: 'ল্যাবরেটরি পরীক্ষা ও মান নিশ্চিতকরণে অভিজ্ঞ।' },
            { icon: '📢', title: 'বিপণন ও বিক্রয়', desc: 'ফিল্ড মার্কেটিং, ডিজিটাল মার্কেটিং ও সেলস প্রফেশনাল।' },
            { icon: '🧪', title: 'গবেষণা ও উন্নয়ন', desc: 'নতুন পণ্য উদ্ভাবন ও বিদ্যমান ফর্মুলা উন্নয়নে আগ্রহী।' },
            { icon: '🚛', title: 'সাপ্লাই চেইন', desc: 'লজিস্টিক্স, সরবরাহ ব্যবস্থাপনা ও ডিস্ট্রিবিউশনে দক্ষ।' },
            { icon: '⚙️', title: 'ইঞ্জিনিয়ারিং', desc: 'যন্ত্রপাতি রক্ষণাবেক্ষণ ও উৎপাদন প্রকৌশলে অভিজ্ঞ।' },
            { icon: '💼', title: 'প্রশাসন ও অর্থ', desc: 'HR, Finance ও Administrative পদে যোগ্য প্রার্থী।' },
          ],
        },
      },
      {
        type: 'CareerProcessBlock',
        props: {
          id: 'career-process',
          tagText: 'Application Process',
          heading: 'আবেদন করার',
          headingHighlight: 'পদ্ধতি',
          steps: [
            { no: '০১', title: 'CV জমা দিন', desc: 'আপনার আপডেট করা CV, কভার লেটার এবং সংশ্লিষ্ট সার্টিফিকেটের কপি ইমেইলে পাঠান।' },
            { no: '০২', title: 'স্ক্রিনিং', desc: 'আমাদের HR টিম সব আবেদন পর্যালোচনা করে যোগ্য প্রার্থীদের সাথে যোগাযোগ করে।' },
            { no: '০৩', title: 'ইন্টারভিউ', desc: 'প্রাথমিক স্ক্রিনিং পেরোলে ফোন বা সরাসরি ইন্টারভিউয়ের জন্য আমন্ত্রণ জানানো হয়।' },
            { no: '০৪', title: 'যোগদান', desc: 'চূড়ান্ত নির্বাচন হলে নিয়োগপত্র ও অনবোর্ডিং প্রক্রিয়া সম্পন্ন হয়।' },
          ],
          ctaTitle: 'আপনার CV পাঠান',
          ctaHighlight: 'আজই',
          ctaBody: 'আমরা প্রতিনিয়ত প্রতিভাবান মানুষদের খুঁজে চলেছি। আপনার CV আমাদের ডেটাবেসে যুক্ত হলে উপযুক্ত পদ খালি হলে আমরা যোগাযোগ করব।',
          ctaTags: [
            { text: 'কৃষির প্রতি আগ্রহ' },
            { text: 'পরিবেশ সচেতনতা' },
            { text: 'দলগত কাজের মানসিকতা' },
          ],
          ctaEmail: 'careers@paragongroup.com.bd',
        },
      },
    ],
  },

  contact: {
    root: { props: { title: 'যোগাযোগ' } },
    content: [
      {
        type: 'PageBannerBlock',
        props: {
          id: 'contact-banner',
          tagText: 'Contact Us',
          title: 'আমাদের সাথে',
          titleHighlight: 'যোগাযোগ করুন',
          subtitle: 'আমরা সর্বদা আপনার সেবায় প্রস্তুত। পণ্য, ডিলারশিপ বা যেকোনো বিষয়ে কথা বলুন।',
          bgGradient: 'linear-gradient(135deg, #0a1f14 0%, #1B4D3E 55%, #2D7A3A 100%)',
          align: 'left',
          breadcrumb1Label: 'যোগাযোগ',
          breadcrumb1Href: '',
          breadcrumb2Label: '',
        },
      },
      {
        type: 'ContactInfoBlock',
        props: {
          id: 'contact-info',
          tagText: 'Contact Details',
          heading: 'আমাদের',
          headingHighlight: 'সাথে কথা বলুন',
          cards: [
            { icon: '📞', title: 'ফোন', lines: [{ text: '+880 1711-630515' }, { text: '+880 9678-882102' }], href: 'tel:+8801711630515', color: '#1B4D3E' },
            { icon: '✉️', title: 'ইমেইল', lines: [{ text: 'info@paragongroup-bd.com' }, { text: 'info.fertilizer@paragon.com.bd' }], href: 'mailto:info@paragongroup-bd.com', color: '#2D7A3A' },
            { icon: '📍', title: 'ঠিকানা', lines: [{ text: 'প্যারাগন হাউস' }, { text: '৫ মহাখালি সি/এ, ঢাকা ১২১২' }, { text: 'বাংলাদেশ' }], href: 'https://maps.google.com/?q=Mohakhali+CA+Dhaka', color: '#D4A017' },
            { icon: '🕐', title: 'অফিস সময়', lines: [{ text: 'রবি – বৃহঃ: সকাল ৯টা – বিকাল ৫টা' }, { text: 'শুক্র: সকাল ৯টা – দুপুর ১টা' }, { text: 'শনি: বন্ধ' }], href: '', color: '#1B4D3E' },
          ],
        },
      },
      {
        type: 'ContactFormMapBlock',
        props: {
          id: 'contact-form-map',
          formHeading: 'বার্তা পাঠান',
          formHighlight: 'আমাদের কাছে',
          mapHeading: 'আমাদের',
          mapHighlight: 'কার্যালয়',
          mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.424!2d90.40315!3d23.77932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70000000001%3A0x0!2sMohakhali+CA%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1699000000000',
          officeName: 'প্রধান কার্যালয়',
          officeAddress: 'প্যারাগন হাউস, ৫ মহাখালি সি/এ, ঢাকা ১২১২, বাংলাদেশ',
          orderEmail: 'info.fertilizer@paragon.com.bd',
        },
      },
      {
        type: 'ContactFAQBlock',
        props: {
          id: 'contact-faq',
          tagText: 'FAQ',
          heading: 'সাধারণ',
          headingHighlight: 'প্রশ্নোত্তর',
          faqs: [
            { q: 'পণ্য কোথা থেকে কিনব?', a: 'সারাদেশে আমাদের অনুমোদিত ডিলারদের মাধ্যমে পণ্য পাওয়া যায়। নিকটতম ডিলারের তথ্য জানতে আমাদের ফোন করুন বা ডিলারশিপ পেজ দেখুন।' },
            { q: 'কোন ফসলে ব্যবহার করা যায়?', a: 'ধান, সবজি, ফল, গম, পাট সহ সকল ধরনের ফসলে প্যারাগন জৈব সার ব্যবহার করা যায়।' },
            { q: 'প্রতি বিঘায় কতটুকু দিতে হবে?', a: 'সাধারণত প্রতি বিঘায় ১৫-২০ কেজি ব্যবহার করা হয়। তবে মাটির অবস্থা অনুযায়ী পরিমাণ কম-বেশি হতে পারে।' },
            { q: 'রাসায়নিক সারের সাথে কি মেশানো যায়?', a: 'হ্যাঁ, প্রাথমিকভাবে রাসায়নিক ও জৈব সার একসাথে ব্যবহার করা যায়। ধীরে ধীরে রাসায়নিক সারের পরিমাণ কমিয়ে সম্পূর্ণ জৈব পদ্ধতিতে চলে আসা ভালো।' },
          ],
        },
      },
    ],
  },

}

export function getDefaultLayout(slug: string): PuckData {
  if (defaultLayouts[slug]) return defaultLayouts[slug]
  const base = slug.split('/')[0]
  if (defaultLayouts[base]) return defaultLayouts[base]
  return {
    root: { props: { title: slug } },
    content: [
      { type: 'HeroBanner', props: { id: `${slug}-hero`, headingBn: slug, headingEn: slug, subtitleBn: 'এখানে আপনার content লিখুন', ctaLabel: '', ctaHref: '', bgColor: '#1B4D3E' } },
    ],
  }
}
