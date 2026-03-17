// script.js
let searchTerm = '';                     // NEW: search input value
let searchDebounceTimeout;                // for debouncing
const products = [
  { id: 1, name: "UrbanLite Wireless Headphones", price: 1299, category: "Electronics", rating: 4.5, reviews: 342, 
    description: "Immersive sound with 40mm drivers and ANC. 30h battery, fast USB‑C, memory foam.",
    images: [
      "https://i.postimg.cc/B6GMbRyq/P1-2.jpg",
      "https://i.postimg.cc/fRn3GZSq/P1-3.jpg",
      "https://i.postimg.cc/Px9ZNDNJ/P1-4.jpg",
       "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500"
    ]
  },
  { id: 2, name: "NoiseFit Smartwatch", price: 899, category: "Electronics", rating: 4.3, reviews: 215, 
    description: "AMOLED display, heart rate, sleep tracking. 5-day battery, interchangeable straps.",
    images: [
      "https://i.postimg.cc/Jh9CmSFP/71985j-Pz-XIL-SL1500.jpg",
      "https://i.postimg.cc/FK2Xmw68/71g-O4o-JYRCL-SL1500.jpg",
      "https://i.postimg.cc/gkBMf8QB/61HFzd-Aji-XL-SL1500.jpg",
      "https://i.postimg.cc/Vkr715c8/71CJ7Mi8j-GL-SL1500.jpg"
    ]
  },
  { id: 3, name: "Merino Wool Sweater", price: 799, category: "Clothing", rating: 4.7, reviews: 98, 
    description: "Soft, breathable merino wool. Warm without itch. Charcoal and navy.",
    images: [
      "https://images.pexels.com/photos/36129313/pexels-photo-36129313/free-photo-of-bright-red-knit-cardigan-on-hanger-display.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://i.postimg.cc/V6WvPbnL/Gemini-Generated-Image-4mq2ui4mq2ui4mq2.png",
      "https://i.postimg.cc/J7T738QB/Gemini-Generated-Image-a5spk1a5spk1a5sp.png",
      "https://i.postimg.cc/Xv0nNYnt/Gemini-Generated-Image-9onivl9onivl9oni.png"
    ]
  },
  { id: 4, name: "Slim Denim Jacket", price: 1199, category: "Clothing", rating: 4.4, reviews: 156, 
    description: "Classic blue denim, modern slim fit. Button front, chest pockets.",
    images: [
      "https://i.postimg.cc/sXgd1BqN/Gemini-Generated-Image-evx4xxevx4xxevx4.png",
      "https://i.postimg.cc/BQKW8f7F/Gemini-Generated-Image-z9azrzz9azrzz9az.png",
      "https://i.postimg.cc/gjL763sY/Gemini-Generated-Image-kbtbc3kbtbc3kbtb.png",
      "https://images.pexels.com/photos/5926306/pexels-photo-5926306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ]
  },
  { id: 5, name: "Leather Backpack", price: 1499, category: "Accessories", rating: 4.8, reviews: 73, 
    description: "Full-grain leather, padded laptop sleeve, brass hardware.",
    images: [
      "https://i.postimg.cc/X7ngBT8Y/8a9e9080-50d8-4bc5-9f4b-7045e0d79ea3.jpg",
      "https://i.postimg.cc/fTXhkSBv/Gemini-Generated-Image-t1fk5ut1fk5ut1fk.png",
      "https://i.postimg.cc/Nj5m1Yrv/Gemini-Generated-Image-7nlt787nlt787nlt.png",
      "https://i.postimg.cc/mkLFhGGN/Gemini-Generated-Image-5lkeui5lkeui5lke.png"
    ]
  },
  { id: 6, name: "Aviator Sunglasses", price: 599, category: "Accessories", rating: 4.2, reviews: 201, 
    description: "Gold-toned frame, UV400, polarized lenses. Unisex.",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://i.postimg.cc/W3RHB5P4/Gemini-Generated-Image-90ki4090ki4090ki.png",
      "https://i.postimg.cc/8zjXs2ps/Gemini-Generated-Image-xh2z34xh2z34xh2z.png",
      "https://i.postimg.cc/KzwBqWXN/Gemini-Generated-Image-nnbyyknnbyyknnby.png"
    ]
  },
  { id: 7, name: "Wireless Earbuds", price: 699, category: "Electronics", rating: 4.1, reviews: 432, 
    description: "True wireless, charging case, touch controls, 20h playtime.",
    images: [
      "https://i.postimg.cc/MpMtz15v/Gemini-Generated-Image-lxm2gdlxm2gdlxm2.png",
      "https://images.pexels.com/photos/8858287/pexels-photo-8858287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://i.postimg.cc/2j0xv0Xx/Gemini-Generated-Image-xgtvbcxgtvbcxgtv.png",
      "https://i.postimg.cc/WpYMthh7/Gemini-Generated-Image-l4q3j9l4q3j9l4q3.png"
    ]
  },
  { id: 8, name: "Linen Shirt (Beige)", price: 449, category: "Clothing", rating: 4.5, reviews: 88, 
    description: "Lightweight linen-cotton blend, breathable, regular fit.",
    images: [
      "https://i.postimg.cc/hvKsbw9n/Gemini-Generated-Imahttps://i.postimg.cc/rFX0bWbz/87e94f4b-37f4-45b7-9b97-385046e4e826.jpgge-v8uamxv8uamxv8ua.png",
      "https://i.postimg.cc/j2vX8XX2/Gemini-Generated-Image-ay8e9eay8e9eay8e.png",
      "https://i.postimg.cc/pTJYTZ38/Gemini-Generated-Image-bp1xs5bp1xs5bp1x.png",
      "https://i.postimg.cc/J073BXLh/Gemini-Generated-Image-hfd21chfd21chfd2.png"
    ]
  },
  { id: 9, name: "Trail Running Shoes", price: 999, category: "Footwear", rating: 4.6, reviews: 124, 
    description: "Grippy outsole, breathable mesh, responsive cushioning.",
    images: [
      "https://i.postimg.cc/rFX0bWbz/87e94f4b-37f4-45b7-9b97-385046e4e826.jpg",
      "https://i.postimg.cc/9MkTznJ1/Gemini-Generated-Image-xxva9pxxva9pxxva.png",
      "https://i.postimg.cc/MGQXdpDR/Gemini-Generated-Image-fa6ytcfa6ytcfa6y.png",
      "https://i.postimg.cc/c40YCwcj/Gemini-Generated-Image-orsxuzorsxuzorsx.png"
    ]
  },
  { id: 10, name: "Canvas Sneakers", price: 499, category: "Footwear", rating: 4.3, reviews: 309, 
    description: "Classic low-top, organic cotton, vulcanized sole.",
    images: [
      "https://i.postimg.cc/Bb1hvDcq/83d43a80-58bc-482d-8a8a-6884f7e1e88d.jpg",
      "https://i.postimg.cc/kXvHRNPx/Gemini-Generated-Image-bpjt4wbpjt4wbpjt.png",
      "https://i.postimg.cc/B6FYSHC3/Gemini-Generated-Image-12t2912t2912t291.png",
      "https://i.postimg.cc/Twn0MGRf/Gemini-Generated-Image-oc5xpmoc5xpmoc5x.png"
    ]
  },
  { id: 11, name: "Leather Chelsea Boots", price: 1799, category: "Footwear", rating: 4.8, reviews: 67, 
    description: "Premium leather, elastic panels, durable sole.",
    images: [
      "https://i.postimg.cc/qMWNnKsZ/4513-3d.jpg",
      "https://i.postimg.cc/25tjRRH3/Gemini-Generated-Image-xxyc1hxxyc1hxxyc.png",
      "https://i.postimg.cc/PJtRSNmD/Gemini-Generated-Image-72wrw472wrw472wr.png",
      "https://i.postimg.cc/xTZ6z6Ff/Gemini-Generated-Image-namrztnamrztnamr.png"
    ]
  },
  { id: 12, name: "Smart LED Desk Lamp", price: 399, category: "Electronics", rating: 4.4, reviews: 152, 
    description: "Wireless charging, adjustable color temp, touch control.",
    images: [
       "https://i.postimg.cc/kgFtm4S1/Gemini-Generated-Image-6apnl06apnl06apn.png",
      "https://i.postimg.cc/wj6hfP44/Gemini-Generated-Image-dr9wkdr9wkdr9wkd.png",
      "https://i.postimg.cc/QMm5ptx6/89acde70-b622-4a0a-b374-660dc64e329d.png",
      "https://i.postimg.cc/hPFFd8Zq/Gemini-Generated-Image-yq9947yq9947yq99.png"
    ]
  },
  { id: 13, name: "Yoga Mat (Eco)", price: 349, category: "Accessories", rating: 4.7, reviews: 98, 
    description: "Natural rubber, non-slip, alignment markers.",
    images: [
      "https://i.postimg.cc/XYjnrcXy/Screenshot-2026-03-17-130250.png",
      "https://i.postimg.cc/rm3pWd7X/rolled-up-yoga-mat-floor.jpg",
      "https://i.postimg.cc/hPMH5FPn/Screenshot-2026-03-17-130400.png",
      "https://i.postimg.cc/x8B9kWJc/Untitled-design.png"
    ]
  },
  { id: 14, name: "Cotton Baseball Cap", price: 249, category: "Accessories", rating: 4.2, reviews: 213, 
    description: "Adjustable strap, pre-curved visor, breathable cotton.",
    images: [
      "https://i.postimg.cc/25W9mgm2/5aa8ada2-af15-42d4-86af-38132f08acce.jpg",
      "https://i.postimg.cc/bwt92bMJ/Gemini-Generated-Image-k0xurak0xurak0xu.png",
      "https://i.postimg.cc/MTDDpSLD/Gemini-Generated-Image-gkwqk3gkwqk3gkwq.png",
       "https://i.postimg.cc/hj69jtrP/Gemini-Generated-Image-kz6h6ukz6h6ukz6h.png"
    ]
  },
  { id: 15, name: "Leather Wallet RFID", price: 399, category: "Accessories", rating: 4.6, reviews: 178, 
    description: "Minimalist design, RFID blocking, 4 card slots.",
    images: [
      "https://i.postimg.cc/D0SBjNCQ/pexels-candy-12495664.jpg",
      "https://i.postimg.cc/431LmV7K/Gemini-Generated-Image-uck18nuck18nuck1.png",
      "https://i.postimg.cc/gcxCBtLT/pexels-emil-kalibradov-3013808-7085769.jpg",
      "https://i.postimg.cc/jS369c7X/Gemini-Generated-Image-t6lprct6lprct6lp.png"
    ]
  },
  { id: 16, name: "Hoodie (Fleece)", price: 599, category: "Clothing", rating: 4.8, reviews: 344, 
    description: "Organic cotton blend, kangaroo pocket, adjustable hood.",
    images: [
      "https://i.postimg.cc/Kz1mfGyJ/Screenshot-2026-03-17-132531.png",
      "https://i.postimg.cc/SsMwjJhL/Gemini-Generated-Image-1z2xko1z2xko1z2x.png",
      "https://i.postimg.cc/FsWD5htm/Gemini-Generated-Image-omt6buomt6buomt6.png",
      "https://i.postimg.cc/t7Gsx1ww/Gemini-Generated-Image-w7j5oew7j5oew7j5.png"
    ]
  },
  { id: 17, name: "Jogger Sweatpants", price: 449, category: "Clothing", rating: 4.5, reviews: 126, 
    description: "French terry, tapered fit, elastic cuffs.",
    images: [
     
      "https://i.postimg.cc/RFrNWs8g/5bc9dc9c1693e.jpg",
      "https://i.postimg.cc/MKsH7K4L/450337-cover.jpg",
       "https://i.postimg.cc/kGv63QTF/5bc9dc9c85876.jpg",
      "https://i.postimg.cc/d1mtLqGK/450338-cover.jpg",
    ]
  },
  { id: 18, name: "Portable Bluetooth Speaker JBL ", price: 549, category: "Electronics", rating: 4.4, reviews: 287, 
    description: "Waterproof, 12h play, built-in power bank.",
    images: [
      "https://i.postimg.cc/HxV1Cd3b/71Hd-LDJEEUL-SX569.jpg",
      "https://i.postimg.cc/x1RwJc44/91xa-R6hhe3L-SL1500.jpg",
      "https://i.postimg.cc/Jn9vVJsH/91KLb-NK9pp-L-SL1500.jpg",
      "https://i.postimg.cc/xTG7hXnS/91u8BIzlo-SL-SL1500.jpg"
    ]
  },
  { id: 19, name: "Leather Sandals", price: 699, category: "Footwear", rating: 4.3, reviews: 92, 
    description: "Genuine leather, contoured footbed, adjustable strap.",
    images: [
      "https://i.postimg.cc/Wb9mdV7N/715A8Qpg-A-L-SY695.jpg",
      "https://i.postimg.cc/hjqTktSv/713HY2wle-EL-SY695.jpg",
      "https://i.postimg.cc/HWzXNmRN/81ITz2Vk-Z2L-SY695.jpg",
      "https://i.postimg.cc/JnqDS36P/71P8fo-I-Bz-L-SY695.jpg"
    ]
  },
  { id: 20, name: "Knitted Beanie", price: 199, category: "Clothing", rating: 4.6, reviews: 58, 
    description: "Acrylic wool blend, one size, soft interior.",
    images: [
      "https://i.postimg.cc/vTxy5bVg/71h-MCx3PJs-L-SX679.jpg",
      "https://i.postimg.cc/CLDBgV62/81Fdnp5p-Ae-L-SX679.jpg",
      "https://i.postimg.cc/P5QCCQHm/81et-SS-Nl-TL-SX679.jpg",
      "https://i.postimg.cc/5tPj3968/81Nn-A9m-Bu9L-SX679.jpg"
    ]
  },
  
  { id: 21, name: "Smart LED TV 43 inch", price: 24999, category: "Electronics", rating: 4.6, reviews: 187,
    description: "4K Ultra HD, HDR10, Dolby Audio, 3 HDMI ports, smart functionality with built-in streaming apps.",
    images: [
      "https://i.postimg.cc/cCm8VpmV/81O3Otf3b-PL-SL1500.jpg",
      "https://i.postimg.cc/x1qb4Fz1/81s-JK8JRS0L-SL1500.jpg",
      "https://i.postimg.cc/yYpDcXrw/71a5lw-PJ-DL-SL1500.jpg",
      "https://i.postimg.cc/52H63Yhf/91Kh9fxs-MDL-SL1500.jpg"
    ]
  },
  { id: 22, name: "Men's Casual Shirt", price: 899, category: "Clothing", rating: 4.4, reviews: 102,
    description: "Premium cotton, slim fit, available in blue and white. Perfect for office or casual outings.",
    images: [
      "https://i.postimg.cc/FHDX7DWV/71DKUV4r-Tl-L-SY879.jpg",
      "https://i.postimg.cc/KjrsC8CR/713PHULMy-WL-SY879.jpg",
      "https://i.postimg.cc/CL7QNdj2/71ef-EZa-k-VL-SY879.jpg",
      "https://i.postimg.cc/jjpg5fbf/61SB14q-T0EL-SY879.jpg"
    ]
  },
  { id: 23, name: "Women's Handbag", price: 1299, category: "Accessories", rating: 4.7, reviews: 76,
    description: "Genuine leather, spacious interior, gold-tone hardware. Perfect for daily use.",
    images: [
      "https://i.postimg.cc/Y2b6DFsx/71W45ge-CFu-L-SY695.jpg",
      "https://i.postimg.cc/qMq8P7PD/811Pt0ZEo7L-SY695.jpg",
      "https://i.postimg.cc/pVGjJHmp/61zyv-YQ15-L-SY695.jpg",
      "https://i.postimg.cc/BQjKhVFw/81JXf-VNNQ-L-SY695.jpg"
    ]
  },
  { id: 24, name: "Running Shoes", price: 1599, category: "Footwear", rating: 4.5, reviews: 211,
    description: "Lightweight mesh, cushioned sole, breathable. Ideal for jogging and gym.",
    images: [
      "https://i.postimg.cc/qqVvj1d6/61n0c-n-Fb-BL-SL1500.jpg",
      "https://i.postimg.cc/SR6N5cyd/71e9m-p-GB7L-SL1500.jpg",
      "https://i.postimg.cc/Znx4jZcj/71zd8GZs-FIL-SL1500.jpg",
      "https://i.postimg.cc/Dy720JvL/71DXLsz77GL-SL1500.jpg"
    ]
  },
  { id: 25, name: "Bluetooth home theatre", price: 1999, category: "Electronics", rating: 4.3, reviews: 324,
    description: "Portable, 20W powerful sound, 12-hour battery, IPX7 waterproof. Perfect for parties.",
    images: [
      "https://i.postimg.cc/YSYVQR8N/71OS1KHe2AL-SL1500.jpg",
      "https://i.postimg.cc/3Rhq1GbB/81f-J6MMP8AL-SL1500.jpg",
      "https://i.postimg.cc/7L8tP7DJ/61o7kn-Pw-S-L-SL1500.jpg",
      "https://i.postimg.cc/DzrjSZyX/81ELhh2Dr4L-SL1500.jpg"
    ]
  },
  { id: 26, name: "Denim Jeans", price: 1499, category: "Clothing", rating: 4.5, reviews: 145,
    description: "Classic blue, slim fit, stretch denim. Durable and comfortable.",
    images: [
      "https://i.postimg.cc/Jngkm3C8/613U1p-Ru-Eq-L-SY879.jpg",
      "https://i.postimg.cc/c6GttsJ6/61hz-B28jaz-L-SY879.jpg",
      "https://i.postimg.cc/Hk4P62f8/617TSd-5Hs-L-SY879.jpg",
      "https://i.postimg.cc/Zqbs2NSv/51E5jpla-Hg-L-SY879.jpg"
    ]
  },
  { id: 27, name: "Sunglasses Polarized ", price: 499, category: "Accessories", rating: 4.2, reviews: 98,
    description: "Polarized lenses, UV400 protection, unisex design. Stylish and lightweight.",
    images: [
      "https://i.postimg.cc/V6bqVsd5/51qx-Rhs-IOe-L-SX679.jpg",
      "https://i.postimg.cc/pTnf6VpK/81y-Nd-DK29b-L-SX679.jpg",
      "https://i.postimg.cc/qMrs1T0k/81Cg7Pbd-G0L-SX679.jpg",
      "https://i.postimg.cc/MKYy4FK4/A1q-G8Wub0c-L-SX679.jpg"
    ]
  },
  { id: 28, name: "Formal Shoes", price: 2199, category: "Footwear", rating: 4.7, reviews: 87,
    description: "Leather upper, cushioned insole, durable sole. Perfect for office and parties.",
    images: [
      "https://i.postimg.cc/BnktwTHs/51NIqys-ZBZL-SY695.jpg",
      "https://i.postimg.cc/7YQLf3Kp/51Fe-Dv-Qogj-L-SY695.jpg",
      "https://i.postimg.cc/jdkjLH8j/51KDte8Mih-L-SY695.jpg",
      "https://i.postimg.cc/jdkjLH8j/51KDte8Mih-L-SY695.jpg"
    ]
  },
  { id: 29, name: "Urban Laptop Backpack", price: 999, category: "Accessories", rating: 4.6, reviews: 112,
    description: "Water-resistant, padded laptop compartment (fits up to 15.6\"), USB charging port.",
    images: [
      "https://i.postimg.cc/gJnp9QWg/31w-LAx-NWzp-L.jpg",
      "https://i.postimg.cc/BQ5dz4KM/71r-Zp-Cdgh5L-SX679.jpg",
      "https://i.postimg.cc/xCbZ32QP/61c-OYifgc6L-SX569.jpg",
      "https://i.postimg.cc/VvQV7VLC/71qnw-B3U7GL-SX569.jpg"
    ]
  },
  { id: 30, name: "Wireless Mouse", price: 399, category: "Electronics", rating: 4.4, reviews: 276,
    description: "2.4GHz wireless, 1600 DPI, silent clicks, ergonomic design. Compatible with all OS.",
    images: [
      "https://i.postimg.cc/mkBS1fg1/613dyv2w-Xd-L-SL1200.jpg",
      "https://i.postimg.cc/Bb4CP9n2/81g-NOOHpw0L-SL1500.jpg",
      "https://i.postimg.cc/c41msSjL/71v-5w-Pgb-EL-SL1200.jpg",
      "https://i.postimg.cc/Kv95jWS4/610k-Vlk8XRL-SL1200.jpg"
    ]
  },
  { id: 31, name: "Portronics Ruffpad ", price: 1299, category: "Electronics", rating: 4.2, reviews: 203,
    description: "Re-Writable LCD Writing Pad with Screen 21.5cm (8.5-inch) for Drawing, Playing, Handwriting Gifts for Kids & Adults,(Black)",
    images: [
      "https://i.postimg.cc/pLHn2YyY/51wfr-F6-1h-L-SL1200.jpg",
      "https://i.postimg.cc/Bn01qctB/51x-LDgsd62L-SL1200.jpg",
      "https://i.postimg.cc/FzS7v74T/610599f-BAh-L-SL1200.jpg",
      "https://i.postimg.cc/T1bpxp6s/51Rh4uw-Cy-UL-SL1200.jpg"
    ]
  },
  { id: 32, name: "Men Sweatshirts", price: 899, category: "Clothing", rating: 4.5, reviews: 156,
    description: "Soft cotton blend, adjustable hood, kangaroo pocket. Available in black and off white.",
    images: [
      "https://i.postimg.cc/rmCPP9d9/51s-SJUx8mw-L-SY879.jpg",
      "https://i.postimg.cc/NMwnDn0j/61SOAIN5ud-L-SY879.jpg",
      "https://i.postimg.cc/rmchxthT/81Xy-ARMWd-L-SY879.jpg",
      "https://i.postimg.cc/B6shH1h8/81Trj-P4Yp-IL-SY879.jpg"
    ]
  },
  { id: 33, name: "Leather Belt", price: 299, category: "Accessories", rating: 4.3, reviews: 89,
    description: "Genuine leather, classic buckle, adjustable. Fits all waist sizes.",
    images: [
      "https://i.postimg.cc/vmDnj8cv/81jv56Hs-VOL-SX679.jpg",
      "https://i.postimg.cc/d0XCKMCK/71meix-m-BL-SX679.jpg",
      "https://i.postimg.cc/vZKT4rZK/71So-Xw0UY8L-SX679.jpg",
      "https://i.postimg.cc/RhGV4fYq/71OE3c-S30o-L-SX679.jpg"
    ]
  },
  { id: 34, name: "Flip Flops Sandals", price: 249, category: "Footwear", rating: 4.1, reviews: 134,
    description: "Comfortable EVA sole, durable, quick-dry. Perfect for beach and casual wear.",
    images: [
      "https://i.postimg.cc/gkwfY81j/51PXGanc-El-L-SY695.jpg",
      "https://i.postimg.cc/htT6mgSx/619GL4wz-BFL-SY695.jpg",
      "https://i.postimg.cc/gk6T9d6G/516ot2i-5h-L-SY695.jpg",
      "https://i.postimg.cc/52dkbGwH/61NMTWrv5RL-SY695.jpg"
    ]
  },
  { id: 35, name: "Desk Organizer", price: 349, category: "Accessories", rating: 4.4, reviews: 67,
    description: "Multi-compartment, wooden finish, keeps your desk tidy. Holds pens, phone, notes.",
    images: [
      "https://i.postimg.cc/vmSKFmhC/71XE1M4r-Ze-L-SL1500.jpg",
      "https://i.postimg.cc/JhdFVhKH/71Vql-OT24XL-SL1500.jpg",
      "https://i.postimg.cc/MGXsDSws/71xiw-Tju-WGL-SL1500.jpg",
      "https://i.postimg.cc/CKdvNgYT/817SQee-Dw-TL-SL1500.jpg"
    ]
  },
  { id: 36, name: "Wireless Charger", price: 699, category: "Electronics", rating: 4.3, reviews: 98,
    description: "Qi-certified, 10W fast charging, compatible with all Qi-enabled devices. LED indicator.",
    images: [
      "https://i.postimg.cc/ZRpx7YQm/51i-Bj48i8z-L-SL1500.jpg",
      "https://i.postimg.cc/gjpqfF9d/61DNFLKFIm-L-SL1500.jpg",
      "https://i.postimg.cc/pLrYNJSr/61d-GKy-Xxc5L-SL1500.jpg",
      "https://i.postimg.cc/2SyFp7tx/41MOYRjnw-L.jpg"
    ]
  },
  { id: 37, name: "Cotton T-Shirt", price: 299, category: "Clothing", rating: 4.5, reviews: 312,
    description: "100% combed cotton, regular fit, crew neck. Available in multiple colors.",
    images: [
      "https://i.postimg.cc/qq3DXWt3/61Emp-Oqn1XL-SY879.jpg",
      "https://i.postimg.cc/nrBTQ75k/61d-H1g-J1xc-L-SY879.jpg",
      "https://i.postimg.cc/T2DtSMwS/61zv-E9ic36L-SY879.jpg",
      "https://i.postimg.cc/MTjmhVWQ/61DBb-UCEYn-L-SX679.jpg"
    ]
  },
  { id: 38, name: "Trekking Shoes ", price: 1799, category: "Footwear", rating: 4.6, reviews: 176,
    description: "Breathable mesh, lightweight, high traction outsole. Ideal for running and training.",
    images: [
      "https://i.postimg.cc/zBSVbG7k/71juc-JHKGr-L-SL1500.jpg",
      "https://i.postimg.cc/zvz3nYPN/71Z-Uyi-Yc-BL-SL1500.jpg",
      "https://i.postimg.cc/Gtg3G8yq/61k-YMc-MO6QL-SL1500.jpg",
      "https://i.postimg.cc/dQ5VzXxh/71i-KT0x5BNL-SL1500.jpg"
    ]
  },
  { id: 39, name: "Rotating Hollow Wheel Watch", price: 899, category: "Accessories", rating: 4.2, reviews: 88,
    description: "Rotating Hollow Wheel Hub Creative Fashion Analog Silicone Magnetic Strap Wrist Watch for Men Boys -WCH368",
    images: [
      "https://i.postimg.cc/W4fP9L48/71Eh-INf-MPt-L-SX679.jpg",
      "https://i.postimg.cc/50YWT7Yy/813EWfje-PXL-SX679.jpg",
      "https://i.postimg.cc/VNvx0GFT/71v7mo-Ff-Pd-L-SX679.jpg",
      "https://i.postimg.cc/TPsZVV7D/613g1VND9NL-SX679.jpg"
    ]
  },
  { id: 40, name: "Ceramic Coffee Mug", price: 199, category: "Accessories", rating: 4.7, reviews: 54,
    description: "Premium ceramic, 350ml capacity, microwave safe. Minimalist design.",
    images: [
      "https://i.postimg.cc/yx1XW5m8/71ib-EFe-Pa-L-SL1500.jpg",
      "https://i.postimg.cc/Pxh1FcFD/61sc3rfl-O5L-SL1500.jpg",
      "https://i.postimg.cc/x8fyq7vv/71ib-EFe-Pa-L-SL1500-(1).jpg",
      "https://i.postimg.cc/3RB2MBPV/71Nf-Hjf-HA2L-SL1500.jpg"
    ]
  }
];

// ---------- STATE ----------
let selectedProductId = 1;
let activeFilter = 'all';
let sortBy = 'default';
let wishlist = new Set(); // store product ids
let cart = []; // array of { id, quantity }
let quantity = 1;

// ---------- DOM ELEMENTS ----------
const mainImage = document.getElementById('mainProductImage');
const thumbnailContainer = document.getElementById('thumbnailContainer');
const productInfo = document.getElementById('productInfo');
const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const clearFiltersBtn = document.getElementById('clearFilters');
const wishlistCountSpan = document.getElementById('wishlistCount');
const cartCountSpan = document.getElementById('cartCount');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const toastContainer = document.getElementById('toastContainer');

// Modal elements
const wishlistModal = document.getElementById('wishlistModal');
const cartModal = document.getElementById('cartModal');
const closeWishlistModal = document.getElementById('closeWishlistModal');
const closeCartModal = document.getElementById('closeCartModal');
const wishlistModalBody = document.getElementById('wishlistModalBody');
const cartModalBody = document.getElementById('cartModalBody');
const cartModalFooter = document.getElementById('cartModalFooter');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');

// ---------- HELPER: show toast ----------
function showToast(message, icon = 'fa-check-circle') {
  const toast = document.createElement('div');
  toast.className = 'toast glass';
  toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ---------- UPDATE WISHLIST UI ----------
function updateWishlistUI() {
  wishlistCountSpan.textContent = wishlist.size;
  // update main product wishlist button if exists
  const wishBtn = document.getElementById('dynamicWishlistBtn');
  if (wishBtn) {
    if (wishlist.has(selectedProductId)) {
      wishBtn.classList.add('active');
      wishBtn.innerHTML = '<i class="fas fa-heart"></i> Wishlisted';
    } else {
      wishBtn.classList.remove('active');
      wishBtn.innerHTML = '<i class="far fa-heart"></i> Wishlist';
    }
  }
  // update card hearts
  document.querySelectorAll('.card-wishlist').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    if (wishlist.has(id)) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="far fa-heart"></i>';
    }
  });
}

// ---------- UPDATE CART UI (count) ----------
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountSpan.textContent = totalItems;
}

// ---------- TOGGLE WISHLIST ----------
function toggleWishlist(productId, showToastMsg = true) {
  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    if (showToastMsg) showToast('Removed from wishlist', 'fa-heart-broken');
  } else {
    wishlist.add(productId);
    if (showToastMsg) showToast('Added to wishlist', 'fa-heart');
  }
  updateWishlistUI();
}

// ---------- ADD TO CART ----------
function addToCart(productId, qty) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ id: productId, quantity: qty });
  }
  updateCartUI();
  showToast(`Added ${qty} × ${products.find(p => p.id === productId).name} to cart`, 'fa-cart-plus');
}

// ---------- REMOVE FROM CART ----------
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  showToast('Item removed from cart', 'fa-trash');
}

// ---------- CHANGE CART ITEM QUANTITY ----------
function changeCartQuantity(productId, newQty) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQty;
      updateCartUI();
    }
  }
}

// ---------- RENDER WISHLIST MODAL ----------
function renderWishlistModal() {
  if (wishlist.size === 0) {
    wishlistModalBody.innerHTML = `
      <div class="empty-illustration">
        <i class="far fa-heart"></i>
        <p>Your wishlist is empty</p>
      </div>`;
    return;
  }
  let html = '';
  wishlist.forEach(id => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    html += `
      <div class="modal-item">
        <img src="${product.images[0]}" class="modal-item-img" alt="${product.name}">
        <div class="modal-item-info">
          <div class="modal-item-title">${product.name}</div>
          <div class="modal-item-price">₹${product.price.toFixed(2)}</div>
        </div>
        <div class="modal-item-actions">
          <button class="add-to-cart-from-wishlist" data-id="${product.id}" title="Add to cart"><i class="fas fa-cart-plus"></i></button>
          <button class="modal-item-remove" data-id="${product.id}" data-type="wishlist" title="Remove"><i class="fas fa-times"></i></button>
        </div>
      </div>
    `;
  });
  wishlistModalBody.innerHTML = html;

  // Attach remove events
  document.querySelectorAll('.modal-item-remove[data-type="wishlist"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id, false);
      renderWishlistModal(); // re-render
    });
  });

  // NEW: Attach add‑to‑cart events
  document.querySelectorAll('.add-to-cart-from-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id, 1); // add quantity 1
      showToast('Added to cart', 'fa-cart-plus');
    });
  });
}

// ---------- RENDER CART MODAL ----------
function renderCartModal() {
if (cart.length === 0) {
  cartModalBody.innerHTML = `
    <div class="empty-illustration">
      <i class="fas fa-shopping-bag"></i>
      <p>Your cart is empty</p>
    </div>`;
  cartModalFooter.innerHTML = '';
  return;
}
  let html = '';
  let total = 0;
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    total += product.price * item.quantity;
    html += `
      <div class="modal-item">
        <img src="${product.images[0]}" class="modal-item-img" alt="${product.name}">
        <div class="modal-item-info">
          <div class="modal-item-title">${product.name}</div>
          <div class="modal-item-price">₹${product.price.toFixed(2)}</div>
        </div>
        <div class="modal-quantity">
          <button class="cart-qty-down" data-id="${product.id}">-</button>
          <span>${item.quantity}</span>
          <button class="cart-qty-up" data-id="${product.id}">+</button>
        </div>
        <button class="modal-item-remove" data-id="${product.id}" data-type="cart"><i class="fas fa-trash"></i></button>
      </div>
    `;
  });
  cartModalBody.innerHTML = html;
  cartModalFooter.innerHTML = `
    <span>Total: ₹${total.toFixed(2)}</span>
    <button class="checkout-btn" id="checkoutBtn">Checkout</button>
  `;

  // attach events
  document.querySelectorAll('.cart-qty-down').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(i => i.id === id);
      if (item) changeCartQuantity(id, item.quantity - 1);
      renderCartModal();
    });
  });
  document.querySelectorAll('.cart-qty-up').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(i => i.id === id);
      if (item) changeCartQuantity(id, item.quantity + 1);
      renderCartModal();
    });
  });
  document.querySelectorAll('.modal-item-remove[data-type="cart"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      removeFromCart(id);
      renderCartModal();
    });
  });
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
  if (typeof window.handleCheckout === 'function') {
    window.handleCheckout();
  } else {
    showToast('Checkout not available', 'fa-exclamation');
  }
});
}

// ---------- RENDER MAIN PRODUCT (gallery + info) ----------
function renderMainProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // set main image
  mainImage.src = product.images[0];
  mainImage.alt = product.name;

  // thumbnails
  thumbnailContainer.innerHTML = '';
  product.images.forEach((imgUrl, index) => {
    const thumb = document.createElement('div');
    thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
    thumb.innerHTML = `<img src="${imgUrl}" alt="thumb">`;
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      mainImage.src = imgUrl;
      document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    thumbnailContainer.appendChild(thumb);
  });

  // rating stars
  const full = Math.floor(product.rating);
  const half = product.rating % 1 !== 0;
  let stars = '';
  for (let i=0; i<full; i++) stars += '<i class="fas fa-star"></i>';
  if (half) stars += '<i class="fas fa-star-half-alt"></i>';
  for (let i=0; i<5-Math.ceil(product.rating); i++) stars += '<i class="far fa-star"></i>';

  productInfo.innerHTML = `
    <h1>${product.name}</h1>
    <div class="rating">${stars} <span>(${product.reviews} reviews)</span></div>
    <div class="price">₹${product.price.toFixed(2)}</div>
    <p class="desc">${product.description}</p>
    <div class="quantity-wrapper">
      <span class="quantity-label">Quantity</span>
      <div class="quantity-control">
        <button id="decrQty"><i class="fas fa-minus"></i></button>
        <input type="text" id="qtyInput" value="1" readonly>
        <button id="incrQty"><i class="fas fa-plus"></i></button>
      </div>
    </div>
    <div class="action-buttons">
      <button class="add-to-cart" id="dynamicAddToCart"><i class="fas fa-shopping-cart"></i> Add to cart</button>
      <button class="wishlist-btn" id="dynamicWishlistBtn"><i class="far fa-heart"></i> Wishlist</button>
    </div>
  `;

  // quantity events
  document.getElementById('decrQty').addEventListener('click', () => {
    quantity = Math.max(1, quantity-1);
    document.getElementById('qtyInput').value = quantity;
  });
  document.getElementById('incrQty').addEventListener('click', () => {
    quantity = Math.min(10, quantity+1);
    document.getElementById('qtyInput').value = quantity;
  });

  // add to cart
  document.getElementById('dynamicAddToCart').addEventListener('click', () => {
    addToCart(product.id, quantity);
  });

  // wishlist button
  document.getElementById('dynamicWishlistBtn').addEventListener('click', () => {
    toggleWishlist(product.id);
  });

  updateWishlistUI();
}

// ---------- FILTER & SORT PRODUCTS ----------
function getFilteredSorted() {
  // Start with all products
  let filtered = [...products];

  // Apply category filter
  if (activeFilter !== 'all') {
    filtered = filtered.filter(p => p.category === activeFilter);
  }

  // Apply search filter (name or category)
  if (searchTerm.trim() !== '') {
    const term = searchTerm.trim().toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.category.toLowerCase().includes(term)
    );
  }

  // Apply sorting
  switch (sortBy) {
    case 'priceAsc': filtered.sort((a,b) => a.price - b.price); break;
    case 'priceDesc': filtered.sort((a,b) => b.price - a.price); break;
    case 'nameAsc': filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
    case 'ratingDesc': filtered.sort((a,b) => b.rating - a.rating); break;
    default: filtered.sort((a,b) => a.id - b.id);
  }
  return filtered;
}

// ---------- RENDER PRODUCT GRID ----------
function renderProductGrid() {
  const productsToShow = getFilteredSorted();
  if (!productsToShow.length) {
    productGrid.innerHTML = '<div class="no-products"><i class="fas fa-box-open"></i> No products found</div>';
    return;
  }

  let html = '';
  productsToShow.forEach(p => {
    const full = Math.floor(p.rating);
    const half = p.rating % 1 !== 0;
    let stars = '';
    for (let i=0; i<full; i++) stars += '<i class="fas fa-star"></i>';
    if (half) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i=0; i<5-Math.ceil(p.rating); i++) stars += '<i class="far fa-star"></i>';

    html += `
      <div class="product-card" data-product-id="${p.id}">
        <img class="card-img" src="${p.images[0]}" alt="${p.name}" loading="lazy">
        <div class="card-category">${p.category}</div>
        <div class="card-title">${p.name}</div>
        <div class="card-price">₹${p.price.toFixed(2)}</div>
        <div class="card-rating">${stars}</div>
        <button class="quick-view" title="Quick view"><i class="fas fa-eye"></i></button>
        <button class="card-wishlist" data-id="${p.id}" title="Wishlist"><i class="far fa-heart"></i></button>
      </div>
    `;
  });
  productGrid.innerHTML = html;

  // attach card click (main product update)
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // ignore if clicking on quick-view or wishlist button
      if (e.target.closest('.quick-view') || e.target.closest('.card-wishlist')) return;
      const id = parseInt(card.dataset.productId);
      if (id !== selectedProductId) {
        selectedProductId = id;
        renderMainProduct(selectedProductId);
        productDetail.style.display = 'grid';
      }
    });
  });

  // quick view buttons
  document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const id = parseInt(card.dataset.productId);
      selectedProductId = id;
      renderMainProduct(selectedProductId);
        productDetail.style.display = 'grid';     
      showToast(`Viewing ${products.find(p=>p.id===id).name}`, 'fa-eye');
      document.querySelector('.product-detail').scrollIntoView({ behavior: 'smooth' });
    });
  });


  closeProductDetail.addEventListener('click', () => {
  productDetail.style.display = 'none';
});  
  // card wishlist buttons
  document.querySelectorAll('.card-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id);
    });
  });
  updateWishlistUI();
}

// ---------- GALLERY ARROWS ----------
galleryPrev.addEventListener('click', () => {
  const product = products.find(p => p.id === selectedProductId);
  if (!product) return;
  const currentSrc = mainImage.src;
  const index = product.images.findIndex(img => img === currentSrc);
  if (index === -1) return;
  const newIndex = (index - 1 + product.images.length) % product.images.length;
  mainImage.src = product.images[newIndex];
  document.querySelectorAll('.thumbnail').forEach((t, i) => {
    t.classList.toggle('active', i === newIndex);
  });
});
galleryNext.addEventListener('click', () => {
  const product = products.find(p => p.id === selectedProductId);
  if (!product) return;
  const currentSrc = mainImage.src;
  const index = product.images.findIndex(img => img === currentSrc);
  if (index === -1) return;
  const newIndex = (index + 1) % product.images.length;
  mainImage.src = product.images[newIndex];
  document.querySelectorAll('.thumbnail').forEach((t, i) => {
    t.classList.toggle('active', i === newIndex);
  });
});

// ---------- FILTER SORT EVENT LISTENERS ----------
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProductGrid();
  });
});
sortSelect.addEventListener('change', (e) => {
  sortBy = e.target.value;
  renderProductGrid();
});
clearFiltersBtn.addEventListener('click', () => {
  activeFilter = 'all';
  sortBy = 'default';
  filterButtons.forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
  sortSelect.value = 'default';
  renderProductGrid();
});
// ---------- SEARCH (real‑time with debounce) ----------
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchDebounceTimeout);
  searchDebounceTimeout = setTimeout(() => {
    searchTerm = e.target.value;
    // Show/hide clear button
    if (searchTerm.trim() !== '') {
      clearSearchBtn.style.display = 'flex';
    } else {
      clearSearchBtn.style.display = 'none';
    }
    renderProductGrid();
  }, 300); // 300ms debounce
});

clearSearchBtn.addEventListener('click', () => {
  searchInput.value = '';
  searchTerm = '';
  clearSearchBtn.style.display = 'none';
  renderProductGrid();
  searchInput.focus();
});
// ---------- MODAL TRIGGERS ----------
document.getElementById('wishlistIconNav').addEventListener('click', () => {
  renderWishlistModal();
  wishlistModal.style.display = 'flex';
});
document.getElementById('cartIconNav').addEventListener('click', () => {
  renderCartModal();
  cartModal.style.display = 'flex';
});

closeWishlistModal.addEventListener('click', () => {
  wishlistModal.style.display = 'none';
});
closeCartModal.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === wishlistModal) wishlistModal.style.display = 'none';
  if (e.target === cartModal) cartModal.style.display = 'none';
});

// ---------- INITIAL RENDER ----------
renderMainProduct(selectedProductId);
renderProductGrid();
updateCartUI();

// Expose a function to render a custom product list (for New/Sale)
window.renderCustomGrid = function(productList, title) {
  if (!productList || productList.length === 0) {
    productGrid.innerHTML = '<div class="no-products"><i class="fas fa-box-open"></i> No products found</div>';
    return;
  }

  let html = '';
  productList.forEach(p => {
    const full = Math.floor(p.rating);
    const half = p.rating % 1 !== 0;
    let stars = '';
    for (let i=0; i<full; i++) stars += '<i class="fas fa-star"></i>';
    if (half) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i=0; i<5-Math.ceil(p.rating); i++) stars += '<i class="far fa-star"></i>';

    html += `
      <div class="product-card" data-product-id="${p.id}">
        <img class="card-img" src="${p.images[0]}" alt="${p.name}" loading="lazy">
        <div class="card-category">${p.category}</div>
        <div class="card-title">${p.name}</div>
        <div class="card-price">₹${p.price.toFixed(2)}</div>
        <div class="card-rating">${stars}</div>
        <button class="quick-view" title="Quick view"><i class="fas fa-eye"></i></button>
        <button class="card-wishlist" data-id="${p.id}" title="Wishlist"><i class="far fa-heart"></i></button>
      </div>
    `;
  });
  productGrid.innerHTML = html;
  // Re-attach event listeners
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.quick-view') || e.target.closest('.card-wishlist')) return;
      const id = parseInt(card.dataset.productId);
      if (id !== selectedProductId) {
        selectedProductId = id;
        renderMainProduct(selectedProductId);
      }
    });
  });
  document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      const id = parseInt(card.dataset.productId);
      selectedProductId = id;
      renderMainProduct(selectedProductId);
      showToast(`Viewing ${products.find(p=>p.id===id).name}`, 'fa-eye');
      document.querySelector('.product-detail').scrollIntoView({ behavior: 'smooth' });
    });
  });
  document.querySelectorAll('.card-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      toggleWishlist(id);
    });
  });
  updateWishlistUI();
  // Show a little toast indicating the filter
  if (title === 'new') showToast('Showing new arrivals', 'fa-gift');
  else if (title === 'sale') showToast('Showing sale items', 'fa-tags');
};

// ---------- GLOBAL FUNCTION TO CLEAR CART (for payment success) ----------
window.clearCart = function() {
  cart = [];
  updateCartUI();
  showToast('Cart cleared after successful payment', 'fa-trash');
};