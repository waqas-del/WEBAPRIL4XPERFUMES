import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private readonly rawProducts = [
    {
        "id": "p1",
        "name": "Guidance 46",
        "brand": "Amouage",
        "category": "Best Women's 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Floral Fruity",
        "keyNotes": "Pear, Hazelnut, Rose, Saffron",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "High-end Galas",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Quentin Bisch",
        "originalPrice": 1800,
        "pros": [
            "Incredible projection"
        ],
        "cons": [
            "Can be overwhelming"
        ],
        "comment": "A luxurious and bold statement fragrance.",
        "profession": "CEO, Director",
        "persona": "Authoritative and mysterious.",
        "isTopPick": true
    },
    {
        "id": "p2",
        "name": "Shalimar L'Essence",
        "brand": "Guerlain",
        "category": "Best Women's 2025",
        "gender": "Female",
        "olfactoryFamily": "Amber Floral",
        "keyNotes": "Bergamot, Iris, Vanilla",
        "whenToWear": "Winter, Autumn",
        "bestOccasion": "Romantic Dinners",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Delphine Jelk",
        "originalPrice": 750,
        "pros": [
            "Modern take on a classic"
        ],
        "cons": [
            "Too mature for some"
        ],
        "comment": "Powdery vanilla embrace.",
        "profession": "Art Curator",
        "persona": "Sophisticated intellectual.",
        "isTopPick": true
    },
    {
        "id": "p3",
        "name": "Valaya Exclusif",
        "brand": "Parfums de Marly",
        "category": "Best Women's 2025",
        "gender": "Female",
        "olfactoryFamily": "Floral Musk",
        "keyNotes": "White Peach, Orange Blossom",
        "whenToWear": "Spring, Summer",
        "bestOccasion": "Upscale Brunches",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Quentin Bisch",
        "originalPrice": 1450,
        "pros": [
            "Clean, radiant, classy"
        ],
        "cons": [
            "High price point"
        ],
        "comment": "Like wearing a crisp white silk shirt.",
        "profession": "Architect",
        "persona": "Polished extrovert.",
        "isTopPick": true
    },
    {
        "id": "p4",
        "name": "Bal d'Afrique Absolu",
        "brand": "Byredo",
        "category": "Best Women's 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Woody",
        "keyNotes": "Marigold, Vetiver, Cedar",
        "whenToWear": "Spring, Autumn",
        "bestOccasion": "Creative Meetings",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2025,
        "perfumer": "Jerome Epinette",
        "originalPrice": 1200,
        "pros": [
            "Richer than original"
        ],
        "cons": [
            "Sillage sits close"
        ],
        "comment": "Creamy, uplifting vetiver masterpiece.",
        "profession": "Graphic Designer",
        "persona": "Creative innovator.",
        "isTopPick": true
    },
    {
        "id": "p5",
        "name": "Angels' Share Paradis",
        "brand": "By Kilian",
        "category": "Best Women's 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Gourmand",
        "keyNotes": "Cognac, Cinnamon, Oak",
        "whenToWear": "Winter, Autumn",
        "bestOccasion": "Holiday Parties",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2025,
        "perfumer": "Benoist Lapouza",
        "originalPrice": 1100,
        "pros": [
            "Intoxicatingly boozy"
        ],
        "cons": [
            "Strictly cold weather"
        ],
        "comment": "Boozy apple pie with a luxurious edge.",
        "profession": "Sommelier",
        "persona": "Life-of-the-party.",
        "isTopPick": true
    },
    {
        "id": "p6",
        "name": "Tilia",
        "brand": "Marc-Antoine Barrois",
        "category": "Best Women's 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Floral Woody",
        "keyNotes": "Linden Blossom, Jasmine",
        "whenToWear": "Spring, Summer",
        "bestOccasion": "Garden Parties",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Quentin Bisch",
        "originalPrice": 950,
        "pros": [
            "Nuclear performance"
        ],
        "cons": [
            "Polarizing ambroxan"
        ],
        "comment": "Solar, honeyed floral that projects endlessly.",
        "profession": "Botanist",
        "persona": "Vibrant avant-garde.",
        "isTopPick": true
    },
    {
        "id": "p7",
        "name": "Yum Boujee Marshmallow 81",
        "brand": "Kayali",
        "category": "Best Women's 2025",
        "gender": "Female",
        "olfactoryFamily": "Gourmand",
        "keyNotes": "Marshmallow, Strawberry",
        "whenToWear": "Spring, Winter",
        "bestOccasion": "Girls' Night Out",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2024,
        "perfumer": "Mona Kattan",
        "originalPrice": 550,
        "pros": [
            "Playful and complimentary"
        ],
        "cons": [
            "Lacks complexity"
        ],
        "comment": "Fluffy, sweet pink marshmallow dream.",
        "profession": "Beauty Influencer",
        "persona": "Bubbly trendsetter.",
        "isTopPick": true
    },
    {
        "id": "p8",
        "name": "Fleur de Peau EDT",
        "brand": "Diptyque",
        "category": "Best Women's 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Floral Aldehyde",
        "keyNotes": "Aldehydes, Iris, Ambrette",
        "whenToWear": "Spring, Autumn",
        "bestOccasion": "Office Wear",
        "longevity": "Moderate",
        "sillage": "Intimate",
        "year": 2025,
        "perfumer": "Olivier Pescheux",
        "originalPrice": 700,
        "pros": [
            "Comforting skin scent"
        ],
        "cons": [
            "Weak projection"
        ],
        "comment": "Powdery, musky hug that feels intimate.",
        "profession": "Therapist",
        "persona": "Calm empathetic soul.",
        "isTopPick": true
    },
    {
        "id": "p9",
        "name": "Angham",
        "brand": "Lattafa",
        "category": "Best Women's 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Spicy",
        "keyNotes": "Ginger, Pink Pepper, Oud",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Festive Gatherings",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Lattafa",
        "originalPrice": 150,
        "pros": [
            "Unbeatable value"
        ],
        "cons": [
            "Synthetic opening"
        ],
        "comment": "Loud, spicy-sweet Middle Eastern powerhouse.",
        "profession": "DJ, Freelancer",
        "persona": "Bold and outgoing.",
        "isTopPick": false
    },
    {
        "id": "p10",
        "name": "Black Opium Over Red",
        "brand": "YSL",
        "category": "Best Women's 2025",
        "gender": "Female",
        "olfactoryFamily": "Gourmand",
        "keyNotes": "Cherry, Coffee, Vanilla",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Evening Dates",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2024,
        "perfumer": "Nathalie Lorson",
        "originalPrice": 650,
        "pros": [
            "Cherry modernizes DNA"
        ],
        "cons": [
            "Cherry fades fast"
        ],
        "comment": "Seductive cherry-mocha for night owls.",
        "profession": "Musician",
        "persona": "Confident rebel.",
        "isTopPick": false
    },
    {
        "id": "p11",
        "name": "Bottled Absolu",
        "brand": "Hugo Boss",
        "category": "Best Men's 2025",
        "gender": "Male",
        "olfactoryFamily": "Woody Amber",
        "keyNotes": "Incense, Myrrh, Cedar",
        "whenToWear": "Winter, Autumn",
        "bestOccasion": "Formal Dinners",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Annick Menardo",
        "originalPrice": 550,
        "pros": [
            "Deep and ultra-masculine"
        ],
        "cons": [
            "Linear scent"
        ],
        "comment": "Warm, smoky, woodsy hug.",
        "profession": "Finance Exec",
        "persona": "Sophisticated gentleman.",
        "isTopPick": false
    },
    {
        "id": "p12",
        "name": "Absolu Aventus",
        "brand": "Creed",
        "category": "Best Men's 2025",
        "gender": "Male",
        "olfactoryFamily": "Fruity Chypre",
        "keyNotes": "Grapefruit, Pineapple",
        "whenToWear": "Spring, Summer",
        "bestOccasion": "VIP Events",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "J. Hérault",
        "originalPrice": 1800,
        "pros": [
            "Exceptional citrus opening"
        ],
        "cons": [
            "Very expensive"
        ],
        "comment": "The king of fresh returns darker.",
        "profession": "CEO, Investor",
        "persona": "Alpha male.",
        "isTopPick": false
    },
    {
        "id": "p13",
        "name": "Liquid Brun",
        "brand": "French Avenue",
        "category": "Best Men's 2025",
        "gender": "Male",
        "olfactoryFamily": "Amber Spicy",
        "keyNotes": "Cinnamon, Vanilla, Cardamom",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Date Nights",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Fragrance World",
        "originalPrice": 120,
        "pros": [
            "Amazing affordable clone"
        ],
        "cons": [
            "Bottle feels cheap"
        ],
        "comment": "Cozy, sweet vanilla delight.",
        "profession": "Salesperson",
        "persona": "Smooth talker.",
        "isTopPick": false
    },
    {
        "id": "p14",
        "name": "Dior Homme Intense 2025",
        "brand": "Dior",
        "category": "Best Men's 2025",
        "gender": "Male",
        "olfactoryFamily": "Woody Floral",
        "keyNotes": "Iris, Ambrette, Cedar",
        "whenToWear": "Winter, Autumn",
        "bestOccasion": "Black Tie Events",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Francis Kurkdjian",
        "originalPrice": 700,
        "pros": [
            "Ultimate powdery iris"
        ],
        "cons": [
            "Lipstick vibe"
        ],
        "comment": "Powdery chocolatey woods.",
        "profession": "Lawyer",
        "persona": "Mysterious gentleman.",
        "isTopPick": false
    },
    {
        "id": "p15",
        "name": "L'Homme Idéal Parfum",
        "brand": "Guerlain",
        "category": "Best Men's 2025",
        "gender": "Male",
        "olfactoryFamily": "Amber Woody",
        "keyNotes": "Almond, Leather, Plum",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Romantic Dinners",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Delphine Jelk",
        "originalPrice": 650,
        "pros": [
            "Intoxicating cherry-leather"
        ],
        "cons": [
            "Can lean sweet"
        ],
        "comment": "Boozy amaretto leather dream.",
        "profession": "Architect",
        "persona": "Sensual intellectual.",
        "isTopPick": false
    },
    {
        "id": "p16",
        "name": "MYSLF Le Parfum",
        "brand": "YSL",
        "category": "Best Men's 2025",
        "gender": "Male",
        "olfactoryFamily": "Amber Woody",
        "keyNotes": "Orange Blossom, Woods",
        "whenToWear": "All Seasons",
        "bestOccasion": "Clubbing",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Daniela Andrier",
        "originalPrice": 600,
        "pros": [
            "Mass-appealing"
        ],
        "cons": [
            "Lacks uniqueness"
        ],
        "comment": "Sleek soapy-sweet floral wood.",
        "profession": "PR Agent",
        "persona": "Trendy urbanite.",
        "isTopPick": false
    },
    {
        "id": "p17",
        "name": "Outlands",
        "brand": "Amouage",
        "category": "Best Men's 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Woody Spicy",
        "keyNotes": "Elemi, Frankincense, Oud",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Niche Meetups",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Renaud Salmon",
        "originalPrice": 1800,
        "pros": [
            "Incredibly complex"
        ],
        "cons": [
            "Challenging scent"
        ],
        "comment": "Majestic journey through resins.",
        "profession": "Creative Director",
        "persona": "Uncompromising visionary.",
        "isTopPick": false
    },
    {
        "id": "p18",
        "name": "Supremacy Collector's Ed.",
        "brand": "Afnan",
        "category": "Best Men's 2025",
        "gender": "Male",
        "olfactoryFamily": "Woody Spicy",
        "keyNotes": "Pineapple, Birch, Oakmoss",
        "whenToWear": "Spring, Summer",
        "bestOccasion": "Office Wear",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Afnan",
        "originalPrice": 180,
        "pros": [
            "Fantastic clone"
        ],
        "cons": [
            "Harsh opening"
        ],
        "comment": "Fruity smoky powerhouse.",
        "profession": "Engineer",
        "persona": "Results-driven leader.",
        "isTopPick": false
    },
    {
        "id": "p19",
        "name": "Stronger With You Parfum",
        "brand": "Armani",
        "category": "Best Men's 2025",
        "gender": "Male",
        "olfactoryFamily": "Amber Fougere",
        "keyNotes": "Chestnut, Lavender, Vanilla",
        "whenToWear": "Winter, Autumn",
        "bestOccasion": "Cozy Nights",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Cecile Matton",
        "originalPrice": 550,
        "pros": [
            "Smoothest of the line"
        ],
        "cons": [
            "Redundant to SWY"
        ],
        "comment": "Sweet, nutty winter embrace.",
        "profession": "IT Specialist",
        "persona": "Warm romantic.",
        "isTopPick": false
    },
    {
        "id": "p20",
        "name": "Dior Homme Parfum 2025",
        "brand": "Dior",
        "category": "Best Men's 2025",
        "gender": "Male",
        "olfactoryFamily": "Leather",
        "keyNotes": "Iris, Leather, Rose",
        "whenToWear": "Winter",
        "bestOccasion": "Formal Galas",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2025,
        "perfumer": "Francis Kurkdjian",
        "originalPrice": 750,
        "pros": [
            "Nuclear performance"
        ],
        "cons": [
            "Hard to find"
        ],
        "comment": "Dark waxy leather-iris.",
        "profession": "Executive",
        "persona": "Impeccably dressed alpha.",
        "isTopPick": false
    },
    {
        "id": "p21",
        "name": "Babycat Raw Bourbon",
        "brand": "YSL",
        "category": "Best Unisex 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Spicy",
        "keyNotes": "Vanilla, Bourbon, Suede",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Lounges",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Dominique Ropion",
        "originalPrice": 1200,
        "pros": [
            "Dark sensual vanilla"
        ],
        "cons": [
            "Hard to find"
        ],
        "comment": "Smoky leathery vanilla masterpiece.",
        "profession": "Fashion Designer",
        "persona": "Edgy trendsetter.",
        "isTopPick": false
    },
    {
        "id": "p22",
        "name": "Angel's Share On The Rocks",
        "brand": "By Kilian",
        "category": "Best Unisex 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Apple, Cognac, Cinnamon",
        "whenToWear": "Winter",
        "bestOccasion": "Festive Galas",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Benoist Lapouza",
        "originalPrice": 1100,
        "pros": [
            "Crisp icy edge"
        ],
        "cons": [
            "Redundant to original"
        ],
        "comment": "Chilled spiced cognac.",
        "profession": "Art Dealer",
        "persona": "Sophisticated extrovert.",
        "isTopPick": false
    },
    {
        "id": "p23",
        "name": "Narcotic Delight",
        "brand": "Initio",
        "category": "Best Unisex 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Cherry, Cognac, Tobacco",
        "whenToWear": "Winter",
        "bestOccasion": "Clubbing",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Initio",
        "originalPrice": 1300,
        "pros": [
            "Seductive and addictive"
        ],
        "cons": [
            "Synthetic cherry"
        ],
        "comment": "Boozy cherry-tobacco temptation.",
        "profession": "Promoter",
        "persona": "Magnetic night owl.",
        "isTopPick": false
    },
    {
        "id": "p24",
        "name": "Vanilla Powder",
        "brand": "Matiere Premiere",
        "category": "Best Unisex 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Vanilla, Palo Santo",
        "whenToWear": "All Seasons",
        "bestOccasion": "Casual Luxury",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Aurélien Guichard",
        "originalPrice": 900,
        "pros": [
            "Dry non-gourmand vanilla"
        ],
        "cons": [
            "Palo Santo dusty"
        ],
        "comment": "Woody dry vanilla cloud.",
        "profession": "Writer",
        "persona": "Chic intellectual.",
        "isTopPick": false
    },
    {
        "id": "p25",
        "name": "Bois Impérial Extrait",
        "brand": "Essential Parfums",
        "category": "Best Unisex 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Woody Spicy",
        "keyNotes": "Akigalawood, Vetiver",
        "whenToWear": "All Seasons",
        "bestOccasion": "Office Wear",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Quentin Bisch",
        "originalPrice": 650,
        "pros": [
            "Nuclear performance"
        ],
        "cons": [
            "Linear"
        ],
        "comment": "Sharp metallic wood.",
        "profession": "Surgeon",
        "persona": "Precise professional.",
        "isTopPick": false
    },
    {
        "id": "p26",
        "name": "Blue Talisman Extrait",
        "brand": "Ex Nihilo",
        "category": "Best Niche 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Woody Fruity",
        "keyNotes": "Pear, Bergamot, Musks",
        "whenToWear": "Spring, Summer",
        "bestOccasion": "Upscale Events",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Jordi Fernández",
        "originalPrice": 1600,
        "pros": [
            "Fresh and unique"
        ],
        "cons": [
            "Sharp to some"
        ],
        "comment": "Sparkling futuristic fruity wood.",
        "profession": "Tech CEO",
        "persona": "Forward-thinking innovator.",
        "isTopPick": false
    },
    {
        "id": "p27",
        "name": "Blanche Bête Ltd Ed.",
        "brand": "Les Liquides Imaginaires",
        "category": "Best Niche 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Floral Musk",
        "keyNotes": "Milk, Tuberose, Vanilla",
        "whenToWear": "Winter, Spring",
        "bestOccasion": "Cozy Dates",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Louise Turner",
        "originalPrice": 1100,
        "pros": [
            "Creamy lactonic scent"
        ],
        "cons": [
            "Lactic notes polarizing"
        ],
        "comment": "Milky white-floral cloud.",
        "profession": "Therapist",
        "persona": "Gentle dreamer.",
        "isTopPick": false
    },
    {
        "id": "p28",
        "name": "Rabbit",
        "brand": "Zoologist",
        "category": "Best Niche 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Gourmand",
        "keyNotes": "Carrot, Biscuit, Hay",
        "whenToWear": "Spring, Autumn",
        "bestOccasion": "Casual Brunches",
        "longevity": "Long lasting",
        "sillage": "Moderate",
        "year": 2024,
        "perfumer": "Mackenzie Reilly",
        "originalPrice": 850,
        "pros": [
            "Highly unique"
        ],
        "cons": [
            "Too food-like"
        ],
        "comment": "Hyper-realistic carrot cake picnic.",
        "profession": "Chef",
        "persona": "Quirky creative.",
        "isTopPick": false
    },
    {
        "id": "p29",
        "name": "Tubéreuse Astrale",
        "brand": "Maison Crivelli",
        "category": "Best Niche 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Floral",
        "keyNotes": "Tuberose, Cinnamon",
        "whenToWear": "Autumn",
        "bestOccasion": "Art Exhibitions",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Quentin Bisch",
        "originalPrice": 1050,
        "pros": [
            "Unique spicy tuberose"
        ],
        "cons": [
            "Polarizing"
        ],
        "comment": "Cinematic spicy floral explosion.",
        "profession": "Critic",
        "persona": "Avant-garde trendsetter.",
        "isTopPick": false
    },
    {
        "id": "p30",
        "name": "Deified Tony Iommi",
        "brand": "Xerjoff",
        "category": "Best Niche 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Leather",
        "keyNotes": "Saffron, Leather, Rose",
        "whenToWear": "Winter",
        "bestOccasion": "Rock Concerts",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Chris Maurice",
        "originalPrice": 1400,
        "pros": [
            "Dark and gothic"
        ],
        "cons": [
            "Unapologetically heavy"
        ],
        "comment": "Gothic leather jacket with roses.",
        "profession": "Rocker",
        "persona": "Bold rugged individual.",
        "isTopPick": false
    },
    {
        "id": "p31",
        "name": "Il Padrino",
        "brand": "Sospiro",
        "category": "Best Niche 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Whiskey, Caramel",
        "whenToWear": "Winter",
        "bestOccasion": "Cigar Lounges",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Christian Provenzano",
        "originalPrice": 1300,
        "pros": [
            "Blended boozy gourmand"
        ],
        "cons": [
            "Similar to others"
        ],
        "comment": "Syrupy whiskey and caramel.",
        "profession": "Broker",
        "persona": "Indulgent boss.",
        "isTopPick": false
    },
    {
        "id": "p32",
        "name": "Vanille Havane Cuir",
        "brand": "Les Indemodables",
        "category": "Best Niche 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Leather",
        "keyNotes": "Vanilla, Tobacco, Leather",
        "whenToWear": "Winter",
        "bestOccasion": "Private Clubs",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Antoine Lie",
        "originalPrice": 1100,
        "pros": [
            "High-quality ingredients"
        ],
        "cons": [
            "Very dry"
        ],
        "comment": "Realistic cigar lounge vanilla.",
        "profession": "Sommelier",
        "persona": "Refined connoisseur.",
        "isTopPick": false
    },
    {
        "id": "p33",
        "name": "Alexandria II Anniversary",
        "brand": "Xerjoff",
        "category": "Best Niche 2025",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Woody",
        "keyNotes": "Lavender, Rose, Oud",
        "whenToWear": "Winter",
        "bestOccasion": "High-End Galas",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Chris Maurice",
        "originalPrice": 2500,
        "pros": [
            "Pure unadulterated luxury"
        ],
        "cons": [
            "Exorbitantly expensive"
        ],
        "comment": "Ultimate statement of wealth.",
        "profession": "Royalty",
        "persona": "Elite powerful figure.",
        "isTopPick": false
    },
    {
        "id": "p34",
        "name": "Delina",
        "brand": "Parfums de Marly",
        "category": "Mens' Choice for Women",
        "gender": "Female",
        "olfactoryFamily": "Floral",
        "keyNotes": "Turkish Rose, Litchi",
        "whenToWear": "Spring, Summer",
        "bestOccasion": "Spring Weddings",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2017,
        "perfumer": "Quentin Bisch",
        "originalPrice": 1200,
        "pros": [
            "Universally loved"
        ],
        "cons": [
            "Imitated heavily"
        ],
        "comment": "Pretty-princess tart rose.",
        "profession": "Stylist",
        "persona": "Hyper-feminine romantic.",
        "isTopPick": false
    },
    {
        "id": "p35",
        "name": "Libre Le Parfum",
        "brand": "YSL",
        "category": "Mens' Choice for Women",
        "gender": "Female",
        "olfactoryFamily": "Amber Floral",
        "keyNotes": "Lavender, Orange Blossom",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Date Nights",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2022,
        "perfumer": "Anne Flipo",
        "originalPrice": 700,
        "pros": [
            "Syrupy and seductive"
        ],
        "cons": [
            "Heavy for day"
        ],
        "comment": "Boss-babe honeyed lavender.",
        "profession": "Lawyer",
        "persona": "Fierce leader.",
        "isTopPick": false
    },
    {
        "id": "p36",
        "name": "Libre Intense",
        "brand": "YSL",
        "category": "Mens' Choice for Women",
        "gender": "Female",
        "olfactoryFamily": "Amber Fougere",
        "keyNotes": "Lavender, Vanilla",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Evening Events",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2020,
        "perfumer": "Anne Flipo",
        "originalPrice": 650,
        "pros": [
            "Perfect floral-vanilla balance"
        ],
        "cons": [
            "Less unique now"
        ],
        "comment": "Warm golden aura of confidence.",
        "profession": "Manager",
        "persona": "Driven professional.",
        "isTopPick": false
    },
    {
        "id": "p37",
        "name": "Hypnotic Poison",
        "brand": "Dior",
        "category": "Mens' Choice for Women",
        "gender": "Female",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Almond, Jasmine, Vanilla",
        "whenToWear": "Winter",
        "bestOccasion": "Intimate Dates",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 1998,
        "perfumer": "Annick Menardo",
        "originalPrice": 600,
        "pros": [
            "Seductive classic"
        ],
        "cons": [
            "Reformulated weaker"
        ],
        "comment": "Deadly spellbinding almond-vanilla.",
        "profession": "Dancer",
        "persona": "Sultry siren.",
        "isTopPick": false
    },
    {
        "id": "p38",
        "name": "Oud Satin Mood",
        "brand": "MFK",
        "category": "Mens' Choice for Women",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Woody",
        "keyNotes": "Violet, Rose, Oud",
        "whenToWear": "Winter",
        "bestOccasion": "Black Tie Events",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2015,
        "perfumer": "Francis Kurkdjian",
        "originalPrice": 1300,
        "pros": [
            "Unbelievably rich"
        ],
        "cons": [
            "Can choke a room"
        ],
        "comment": "Velvet cloak of sugared roses and oud.",
        "profession": "Surgeon",
        "persona": "Regal sophisticated individual.",
        "isTopPick": false
    },
    {
        "id": "p39",
        "name": "Bianco Latte",
        "brand": "Giardini Di Toscana",
        "category": "Mens' Choice for Women",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Caramel, Honey, Vanilla",
        "whenToWear": "Winter",
        "bestOccasion": "Cozy Indoors",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2023,
        "perfumer": "Silvia Martinelli",
        "originalPrice": 600,
        "pros": [
            "Photorealistic gourmand"
        ],
        "cons": [
            "Very sweet"
        ],
        "comment": "Comforting caramel milk.",
        "profession": "Baker",
        "persona": "Sweet warm person.",
        "isTopPick": false
    },
    {
        "id": "p40",
        "name": "Black Opium",
        "brand": "YSL",
        "category": "Mens' Choice for Women",
        "gender": "Female",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Coffee, Vanilla",
        "whenToWear": "Winter",
        "bestOccasion": "Clubbing",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2014,
        "perfumer": "Nathalie Lorson",
        "originalPrice": 550,
        "pros": [
            "Mass-appealing"
        ],
        "cons": [
            "Ubiquitous"
        ],
        "comment": "Classic sweet coffee party scent.",
        "profession": "Bartender",
        "persona": "Outgoing socialite.",
        "isTopPick": false
    },
    {
        "id": "p41",
        "name": "Shalimar EDP",
        "brand": "Guerlain",
        "category": "Mens' Choice for Women",
        "gender": "Female",
        "olfactoryFamily": "Amber Spicy",
        "keyNotes": "Bergamot, Iris, Incense",
        "whenToWear": "Winter",
        "bestOccasion": "Opera",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 1990,
        "perfumer": "Jacques Guerlain",
        "originalPrice": 650,
        "pros": [
            "Queen of amber"
        ],
        "cons": [
            "Vintage opening"
        ],
        "comment": "Smoky leathery classic.",
        "profession": "Art Historian",
        "persona": "Cultured beauty.",
        "isTopPick": false
    },
    {
        "id": "p42",
        "name": "Hibiscus Mahajád",
        "brand": "Maison Crivelli",
        "category": "Mens' Choice for Women",
        "gender": "Unisex",
        "olfactoryFamily": "Floral",
        "keyNotes": "Hibiscus, Rose, Vanilla",
        "whenToWear": "All Seasons",
        "bestOccasion": "Statement Events",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2021,
        "perfumer": "Quentin Bisch",
        "originalPrice": 1100,
        "pros": [
            "Incredible projection"
        ],
        "cons": [
            "Extremely loud"
        ],
        "comment": "Neon-ruby rose and hibiscus.",
        "profession": "Fashion Editor",
        "persona": "Vibrant extrovert.",
        "isTopPick": false
    },
    {
        "id": "p43",
        "name": "Althaïr",
        "brand": "Parfums de Marly",
        "category": "Womens' Choice for Men",
        "gender": "Male",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Bourbon Vanilla, Praline",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Romantic Dinners",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2023,
        "perfumer": "H. Merati-Kashani",
        "originalPrice": 1100,
        "pros": [
            "Cozy and inviting"
        ],
        "cons": [
            "Too sweet for some"
        ],
        "comment": "Luxuriously spiced vanilla cloud.",
        "profession": "Pilot",
        "persona": "Charming gentleman.",
        "isTopPick": false
    },
    {
        "id": "p44",
        "name": "Dior Homme Parfum",
        "brand": "Dior",
        "category": "Womens' Choice for Men",
        "gender": "Male",
        "olfactoryFamily": "Leather",
        "keyNotes": "Leather, Iris, Rose",
        "whenToWear": "Winter",
        "bestOccasion": "Black Tie Events",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2014,
        "perfumer": "François Demachy",
        "originalPrice": 750,
        "pros": [
            "Pinnacle of designer"
        ],
        "cons": [
            "Hard to find"
        ],
        "comment": "Waxy leather-iris masterpiece.",
        "profession": "CEO",
        "persona": "Impeccably dressed alpha.",
        "isTopPick": false
    },
    {
        "id": "p45",
        "name": "Bleu de Chanel EDP",
        "brand": "Chanel",
        "category": "Womens' Choice for Men",
        "gender": "Male",
        "olfactoryFamily": "Woody Aromatic",
        "keyNotes": "Grapefruit, Incense",
        "whenToWear": "All Seasons",
        "bestOccasion": "Office Wear",
        "longevity": "Long lasting",
        "sillage": "Moderate",
        "year": 2014,
        "perfumer": "Jacques Polge",
        "originalPrice": 650,
        "pros": [
            "Versatile crowd-pleaser"
        ],
        "cons": [
            "Common DNA"
        ],
        "comment": "Ultimate blue fragrance.",
        "profession": "Banker",
        "persona": "Reliable professional.",
        "isTopPick": false
    },
    {
        "id": "p46",
        "name": "Tobacco Vanille",
        "brand": "Tom Ford",
        "category": "Womens' Choice for Men",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Spicy",
        "keyNotes": "Tobacco Leaf, Vanilla",
        "whenToWear": "Winter",
        "bestOccasion": "Holiday Parties",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2007,
        "perfumer": "Olivier Gillotin",
        "originalPrice": 1400,
        "pros": [
            "Rich and festive"
        ],
        "cons": [
            "Heavy and thick"
        ],
        "comment": "Wealthy gentleman's club.",
        "profession": "Entrepreneur",
        "persona": "Powerful presence.",
        "isTopPick": false
    },
    {
        "id": "p47",
        "name": "Terre d'Hermès",
        "brand": "Hermès",
        "category": "Womens' Choice for Men",
        "gender": "Male",
        "olfactoryFamily": "Woody Spicy",
        "keyNotes": "Orange, Pepper, Vetiver",
        "whenToWear": "Spring, Autumn",
        "bestOccasion": "Boardroom",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2006,
        "perfumer": "Jean-Claude Ellena",
        "originalPrice": 550,
        "pros": [
            "Standard for earthy citrus"
        ],
        "cons": [
            "Smells dirty to youth"
        ],
        "comment": "Dirty orange and vetiver.",
        "profession": "Architect",
        "persona": "Mature capable leader.",
        "isTopPick": false
    },
    {
        "id": "p48",
        "name": "Stronger With You Intensely",
        "brand": "Armani",
        "category": "Womens' Choice for Men",
        "gender": "Male",
        "olfactoryFamily": "Amber Fougere",
        "keyNotes": "Toffee, Cinnamon, Vanilla",
        "whenToWear": "Winter",
        "bestOccasion": "Cozy Dates",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2019,
        "perfumer": "Cecile Matton",
        "originalPrice": 500,
        "pros": [
            "Mass-appealing gourmand"
        ],
        "cons": [
            "Very sweet"
        ],
        "comment": "Warm caramelized hug.",
        "profession": "IT Specialist",
        "persona": "Friendly romantic guy.",
        "isTopPick": false
    },
    {
        "id": "p49",
        "name": "Grand Soir",
        "brand": "MFK",
        "category": "Womens' Choice for Men",
        "gender": "Unisex",
        "olfactoryFamily": "Amber",
        "keyNotes": "Amber, Vanilla, Tonka",
        "whenToWear": "Winter",
        "bestOccasion": "Galas",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2016,
        "perfumer": "Francis Kurkdjian",
        "originalPrice": 900,
        "pros": [
            "Pure regal amber"
        ],
        "cons": [
            "Linear"
        ],
        "comment": "Glowing aura of wealth.",
        "profession": "Diplomat",
        "persona": "Polished sophisticated person.",
        "isTopPick": false
    },
    {
        "id": "p50",
        "name": "Dior Homme Intense 2011",
        "brand": "Dior",
        "category": "Womens' Choice for Men",
        "gender": "Male",
        "olfactoryFamily": "Woody Floral",
        "keyNotes": "Iris, Ambrette, Cocoa",
        "whenToWear": "Winter",
        "bestOccasion": "Formal Wear",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2011,
        "perfumer": "François Demachy",
        "originalPrice": 650,
        "pros": [
            "Masterpiece of powdery woods"
        ],
        "cons": [
            "Lipstick vibe"
        ],
        "comment": "Perfectly tailored tuxedo.",
        "profession": "Director",
        "persona": "Cultured mannered gentleman.",
        "isTopPick": false
    },
    {
        "id": "p51",
        "name": "Jazz Club",
        "brand": "Maison Martin Margiela",
        "category": "Womens' Choice for Men",
        "gender": "Male",
        "olfactoryFamily": "Leather",
        "keyNotes": "Rum, Tobacco, Vanilla",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Jazz Bars",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2013,
        "perfumer": "Alienor Massenet",
        "originalPrice": 550,
        "pros": [
            "Atmospheric and boozy"
        ],
        "cons": [
            "Average performance"
        ],
        "comment": "Rum-soaked Brooklyn club.",
        "profession": "Writer",
        "persona": "Soulful romantic.",
        "isTopPick": false
    },
    {
        "id": "p52",
        "name": "Imagination",
        "brand": "Louis Vuitton",
        "category": "Womens' Choice for Men",
        "gender": "Male",
        "olfactoryFamily": "Citrus Aromatic",
        "keyNotes": "Citron, Black Tea",
        "whenToWear": "Summer",
        "bestOccasion": "Vacations",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2021,
        "perfumer": "Jacques Cavallier",
        "originalPrice": 1300,
        "pros": [
            "Best performing fresh tea"
        ],
        "cons": [
            "High price"
        ],
        "comment": "Sparkling ultra-luxe citrus tea.",
        "profession": "Real Estate",
        "persona": "Clean-cut achiever.",
        "isTopPick": false
    },
    {
        "id": "p53",
        "name": "Eclaire",
        "brand": "Lattafa",
        "category": "Sweetest Women's",
        "gender": "Female",
        "olfactoryFamily": "Gourmand",
        "keyNotes": "Caramel, Milk, Sugar",
        "whenToWear": "Winter",
        "bestOccasion": "Cozy Indoors",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Lattafa",
        "originalPrice": 150,
        "pros": [
            "Incredible Bianco Latte clone"
        ],
        "cons": [
            "Can be cloying"
        ],
        "comment": "Creamy caramel dessert.",
        "profession": "Baker",
        "persona": "Comforting sweet person.",
        "isTopPick": false
    },
    {
        "id": "p54",
        "name": "Vanilla Candy Rock Sugar 42",
        "brand": "Kayali",
        "category": "Sweetest Women's",
        "gender": "Female",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Candied Pear, Bubblegum",
        "whenToWear": "Spring, Autumn",
        "bestOccasion": "Casual Outings",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2024,
        "perfumer": "Mona Kattan",
        "originalPrice": 550,
        "pros": [
            "Deliciously sugary"
        ],
        "cons": [
            "Weak longevity"
        ],
        "comment": "Nostalgic luxury candy store.",
        "profession": "Content Creator",
        "persona": "Playful youthful energy.",
        "isTopPick": false
    },
    {
        "id": "p55",
        "name": "Devotion Intense",
        "brand": "Dolce&Gabbana",
        "category": "Sweetest Women's",
        "gender": "Female",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Candied Lemon, Vanilla",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Cafes",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Olivier Cresp",
        "originalPrice": 650,
        "pros": [
            "Richer deeper version"
        ],
        "cons": [
            "Pastry lemon note"
        ],
        "comment": "Warm baked lemon panettone.",
        "profession": "Designer",
        "persona": "Joyful inviting individual.",
        "isTopPick": false
    },
    {
        "id": "p56",
        "name": "Marshmallow Blush",
        "brand": "PARIS CORNER",
        "category": "Sweetest Women's",
        "gender": "Unisex",
        "olfactoryFamily": "Gourmand",
        "keyNotes": "Marshmallow, Vanilla",
        "whenToWear": "Spring",
        "bestOccasion": "Casual Wear",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2025,
        "perfumer": "Paris Corner",
        "originalPrice": 100,
        "pros": [
            "Budget gourmand"
        ],
        "cons": [
            "Simple profile"
        ],
        "comment": "Soft pillowy marshmallow cloud.",
        "profession": "Student",
        "persona": "Innocent friendly person.",
        "isTopPick": false
    },
    {
        "id": "p57",
        "name": "La Vie Est Belle Vanille Nude",
        "brand": "Lancôme",
        "category": "Sweetest Women's",
        "gender": "Female",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Iris, Vanilla, Praline",
        "whenToWear": "Winter",
        "bestOccasion": "Dates",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Lancôme",
        "originalPrice": 600,
        "pros": [
            "Smoother than original"
        ],
        "cons": [
            "Very heavy"
        ],
        "comment": "Dense powdery sweet vanilla.",
        "profession": "Manager",
        "persona": "Classic confident woman.",
        "isTopPick": false
    },
    {
        "id": "p58",
        "name": "Her Intense 2024",
        "brand": "Burberry",
        "category": "Sweetest Women's",
        "gender": "Female",
        "olfactoryFamily": "Fruity Gourmand",
        "keyNotes": "Dark Berries, Benzoin",
        "whenToWear": "Autumn",
        "bestOccasion": "Brunches",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Francis Kurkdjian",
        "originalPrice": 650,
        "pros": [
            "Luscious dark jam"
        ],
        "cons": [
            "Overwhelming"
        ],
        "comment": "Syrupy strawberry blackberry jam.",
        "profession": "Influencer",
        "persona": "Sweet visible fashionista.",
        "isTopPick": false
    },
    {
        "id": "p59",
        "name": "L'eau de Parfum",
        "brand": "Cirque du Soleil",
        "category": "Sweetest Women's",
        "gender": "Unisex",
        "olfactoryFamily": "Gourmand",
        "keyNotes": "Popcorn, Caramel, Butter",
        "whenToWear": "Winter",
        "bestOccasion": "Theme Parks",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Alexis Grugeon",
        "originalPrice": 800,
        "pros": [
            "Unique popcorn note"
        ],
        "cons": [
            "Not serious"
        ],
        "comment": "Smell of a luxury carnival.",
        "profession": "Event Planner",
        "persona": "Whimsical spirit.",
        "isTopPick": false
    },
    {
        "id": "p60",
        "name": "Vanilla Voyage",
        "brand": "MAISON ASRAR",
        "category": "Sweetest Women's",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Vanilla",
        "keyNotes": "Vanilla, Musk, Wood",
        "whenToWear": "All Seasons",
        "bestOccasion": "Daily Wear",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2025,
        "perfumer": "Maison Asrar",
        "originalPrice": 120,
        "pros": [
            "Great layering tool"
        ],
        "cons": [
            "Basic"
        ],
        "comment": "Simple effective sweet vanilla.",
        "profession": "Freelancer",
        "persona": "Easy-going individual.",
        "isTopPick": false
    },
    {
        "id": "p61",
        "name": "Le Sel d'Issey",
        "brand": "Issey Miyake",
        "category": "Freshest Men's",
        "gender": "Male",
        "olfactoryFamily": "Woody Aquatic",
        "keyNotes": "Sea Salt, Vetiver",
        "whenToWear": "Summer",
        "bestOccasion": "Beach Vacations",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2024,
        "perfumer": "Quentin Bisch",
        "originalPrice": 450,
        "pros": [
            "Refreshing marine"
        ],
        "cons": [
            "Fishy to some"
        ],
        "comment": "Salty woody ocean wave.",
        "profession": "Marine Biologist",
        "persona": "Outdoorsy grounded individual.",
        "isTopPick": false
    },
    {
        "id": "p62",
        "name": "Eros Energy",
        "brand": "Versace",
        "category": "Freshest Men's",
        "gender": "Male",
        "olfactoryFamily": "Citrus Fougere",
        "keyNotes": "Blood Orange, Lemon",
        "whenToWear": "Summer",
        "bestOccasion": "Gym & Casual",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Antoine Maisondieu",
        "originalPrice": 480,
        "pros": [
            "Uplifting citrus blast"
        ],
        "cons": [
            "Synthetic drydown"
        ],
        "comment": "Vibrant sparkling citrus bomb.",
        "profession": "Athlete",
        "persona": "Energetic confident guy.",
        "isTopPick": false
    },
    {
        "id": "p63",
        "name": "Light Blue Pour Homme EDT",
        "brand": "Dolce&Gabbana",
        "category": "Freshest Men's",
        "gender": "Male",
        "olfactoryFamily": "Citrus Aromatic",
        "keyNotes": "Grapefruit, Bergamot",
        "whenToWear": "Summer",
        "bestOccasion": "High-Heat Holidays",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2025,
        "perfumer": "Alberto Morillas",
        "originalPrice": 400,
        "pros": [
            "Classic DNA updated"
        ],
        "cons": [
            "Weak in winter"
        ],
        "comment": "Crisp white linen on the coast.",
        "profession": "Sailor",
        "persona": "Relaxed wealthy traveler.",
        "isTopPick": false
    },
    {
        "id": "p64",
        "name": "Buongiorno",
        "brand": "Acqua di Parma",
        "category": "Freshest Men's",
        "gender": "Unisex",
        "olfactoryFamily": "Citrus",
        "keyNotes": "Lemon, Mint, Petitgrain",
        "whenToWear": "Summer",
        "bestOccasion": "Morning Walks",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2025,
        "perfumer": "Acqua di Parma",
        "originalPrice": 700,
        "pros": [
            "Natural and uplifting"
        ],
        "cons": [
            "Fleeting"
        ],
        "comment": "Authentic Italian lemon grove.",
        "profession": "Artist",
        "persona": "Peaceful nature lover.",
        "isTopPick": false
    },
    {
        "id": "p65",
        "name": "Allure Homme Sport Superleggera",
        "brand": "Chanel",
        "category": "Freshest Men's",
        "gender": "Male",
        "olfactoryFamily": "Citrus Woody",
        "keyNotes": "Mandarin, Cedar, Musk",
        "whenToWear": "Spring, Summer",
        "bestOccasion": "Office",
        "longevity": "Long lasting",
        "sillage": "Moderate",
        "year": 2024,
        "perfumer": "Olivier Polge",
        "originalPrice": 650,
        "pros": [
            "Classy and balanced"
        ],
        "cons": [
            "Pricey"
        ],
        "comment": "Polished sporty gentleman.",
        "profession": "Banker",
        "persona": "Active successful professional.",
        "isTopPick": false
    },
    {
        "id": "p66",
        "name": "Le Beau Paradise Garden",
        "brand": "JPG",
        "category": "Freshest Men's",
        "gender": "Male",
        "olfactoryFamily": "Green Gourmand",
        "keyNotes": "Coconut Water, Fig",
        "whenToWear": "Summer",
        "bestOccasion": "Tropical Vacations",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Quentin Bisch",
        "originalPrice": 500,
        "pros": [
            "Fun tropical sweet"
        ],
        "cons": [
            "Clings in heat"
        ],
        "comment": "Sweet green coconut piña colada.",
        "profession": "DJ",
        "persona": "Vacation-ready party guy.",
        "isTopPick": false
    },
    {
        "id": "p67",
        "name": "MYSLF L'Absolu",
        "brand": "YSL",
        "category": "Freshest Men's",
        "gender": "Male",
        "olfactoryFamily": "Woody Floral",
        "keyNotes": "Orange Blossom, Woods",
        "whenToWear": "All Seasons",
        "bestOccasion": "Clubbing",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Daniela Andrier",
        "originalPrice": 600,
        "pros": [
            "Mass appeal"
        ],
        "cons": [
            "Generic"
        ],
        "comment": "Sleek soapy floral wood.",
        "profession": "Promoter",
        "persona": "Trendy urbanite.",
        "isTopPick": false
    },
    {
        "id": "p68",
        "name": "Amber Oud Aqua Dubai",
        "brand": "Al Haramain",
        "category": "Freshest Men's",
        "gender": "Unisex",
        "olfactoryFamily": "Citrus Amber",
        "keyNotes": "Citrus, Amber, Woods",
        "whenToWear": "Summer",
        "bestOccasion": "Office",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Al Haramain",
        "originalPrice": 250,
        "pros": [
            "Great performance"
        ],
        "cons": [
            "Synthetic opening"
        ],
        "comment": "Loud fresh Middle Eastern aquatic.",
        "profession": "Engineer",
        "persona": "Practical worker.",
        "isTopPick": false
    },
    {
        "id": "p69",
        "name": "H24 Herbes Vives",
        "brand": "Hermès",
        "category": "Freshest Men's",
        "gender": "Male",
        "olfactoryFamily": "Green Aromatic",
        "keyNotes": "Fresh Herbs, Pear",
        "whenToWear": "Spring",
        "bestOccasion": "Spring Days",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2024,
        "perfumer": "Christine Nagel",
        "originalPrice": 550,
        "pros": [
            "High-tech green freshness"
        ],
        "cons": [
            "Metallic undertone"
        ],
        "comment": "Wet green urban garden.",
        "profession": "Tech Worker",
        "persona": "Clean futuristic guy.",
        "isTopPick": false
    },
    {
        "id": "p70",
        "name": "Gentleman Society EDP Ambrée",
        "brand": "Givenchy",
        "category": "Best Iris Men's",
        "gender": "Male",
        "olfactoryFamily": "Oriental Woody",
        "keyNotes": "Iris, Coffee, Narcissus",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Speakeasies",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Karine Dubreuil",
        "originalPrice": 550,
        "pros": [
            "Beautiful iris-coffee blend"
        ],
        "cons": [
            "Not versatile"
        ],
        "comment": "Warm roasted take on iris.",
        "profession": "Sommelier",
        "persona": "Suave romantic.",
        "isTopPick": false
    },
    {
        "id": "p71",
        "name": "Armani Code EDP 2024",
        "brand": "Giorgio Armani",
        "category": "Best Iris Men's",
        "gender": "Male",
        "olfactoryFamily": "Amber Fougere",
        "keyNotes": "Iris, Tonka, Cedar",
        "whenToWear": "Autumn",
        "bestOccasion": "Evening Dates",
        "longevity": "Long lasting",
        "sillage": "Moderate",
        "year": 2024,
        "perfumer": "Antoine Maisondieu",
        "originalPrice": 500,
        "pros": [
            "Smooth powdery appeal"
        ],
        "cons": [
            "Sits close"
        ],
        "comment": "Sleek tonka evening scent.",
        "profession": "Software Eng.",
        "persona": "Understated put-together guy.",
        "isTopPick": false
    },
    {
        "id": "p72",
        "name": "Habit Rouge Spirit",
        "brand": "Guerlain",
        "category": "Best Iris Men's",
        "gender": "Male",
        "olfactoryFamily": "Amber Woody",
        "keyNotes": "Iris, Vanilla, Patchouli",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Classic Wear",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Delphine Jelk",
        "originalPrice": 650,
        "pros": [
            "Updates legendary classic"
        ],
        "cons": [
            "Retains vintage feel"
        ],
        "comment": "Regal dusty iris and vanilla.",
        "profession": "Historian",
        "persona": "Elegant classic man.",
        "isTopPick": false
    },
    {
        "id": "p73",
        "name": "Gentleman Society EDP Extrême",
        "brand": "Givenchy",
        "category": "Best Iris Men's",
        "gender": "Male",
        "olfactoryFamily": "Woody Floral",
        "keyNotes": "Iris, Peppermint, Coffee",
        "whenToWear": "Autumn",
        "bestOccasion": "Clubbing",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Karine Dubreuil",
        "originalPrice": 550,
        "pros": [
            "Mint adds fresh touch"
        ],
        "cons": [
            "Can feel disjointed"
        ],
        "comment": "Minty roasted coffee club scent.",
        "profession": "Promoter",
        "persona": "Sharp-dressed night owl.",
        "isTopPick": false
    },
    {
        "id": "p74",
        "name": "502 Iris Cartagena",
        "brand": "Bon Parfumeur",
        "category": "Best Iris Men's",
        "gender": "Unisex",
        "olfactoryFamily": "Woody Floral",
        "keyNotes": "Iris, Rum, Vetiver",
        "whenToWear": "Spring, Autumn",
        "bestOccasion": "Lounges",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2024,
        "perfumer": "Bon Parfumeur",
        "originalPrice": 350,
        "pros": [
            "Boozy unique iris"
        ],
        "cons": [
            "Average longevity"
        ],
        "comment": "Creative rooty boozy iris.",
        "profession": "Artist",
        "persona": "Quirky bohemian soul.",
        "isTopPick": false
    },
    {
        "id": "p75",
        "name": "Velvet Iris",
        "brand": "Essential Parfums",
        "category": "Best Iris Men's",
        "gender": "Unisex",
        "olfactoryFamily": "Floral Musk",
        "keyNotes": "Iris, Musk, Woods",
        "whenToWear": "Spring",
        "bestOccasion": "Office",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2025,
        "perfumer": "Sophie Labbé",
        "originalPrice": 400,
        "pros": [
            "Clean soapy professional"
        ],
        "cons": [
            "Very subdued"
        ],
        "comment": "Crisp clean iris water.",
        "profession": "Accountant",
        "persona": "Organized quiet professional.",
        "isTopPick": false
    },
    {
        "id": "p76",
        "name": "His Confession",
        "brand": "Lattafa",
        "category": "Best Iris Men's",
        "gender": "Male",
        "olfactoryFamily": "Amber Spicy",
        "keyNotes": "Iris, Spices, Vanilla",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Dates",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Lattafa",
        "originalPrice": 150,
        "pros": [
            "Amazing DHI alternative"
        ],
        "cons": [
            "Synthetic drydown"
        ],
        "comment": "Budget sweet powdery evening scent.",
        "profession": "Student",
        "persona": "Smooth confident guy.",
        "isTopPick": false
    },
    {
        "id": "p77",
        "name": "Le Male Elixir Absolu",
        "brand": "JPG",
        "category": "Best Iris Men's",
        "gender": "Male",
        "olfactoryFamily": "Amber Fougere",
        "keyNotes": "Lavender, Iris, Honey",
        "whenToWear": "Winter",
        "bestOccasion": "Clubbing",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2025,
        "perfumer": "Quentin Bisch",
        "originalPrice": 650,
        "pros": [
            "Nuclear projection"
        ],
        "cons": [
            "Extremely sweet"
        ],
        "comment": "Syrupy honey-iris club bomb.",
        "profession": "DJ",
        "persona": "Fun attention-seeking partygoer.",
        "isTopPick": false
    },
    {
        "id": "p78",
        "name": "Eau d'Ombré Leather",
        "brand": "Tom Ford",
        "category": "Best Leather",
        "gender": "Male",
        "olfactoryFamily": "Leather",
        "keyNotes": "Leather, Amber, Cardamom",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Upscale Bars",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Sonia Constant",
        "originalPrice": 850,
        "pros": [
            "Smoother Ombre Leather"
        ],
        "cons": [
            "Lacks raw edge"
        ],
        "comment": "Plush suede with sweet amber.",
        "profession": "Producer",
        "persona": "Rugged self-assured man.",
        "isTopPick": false
    },
    {
        "id": "p79",
        "name": "Falcon Leather Extrait",
        "brand": "Matiere Premiere",
        "category": "Best Leather",
        "gender": "Unisex",
        "olfactoryFamily": "Leather",
        "keyNotes": "Saffron, Birch Tar",
        "whenToWear": "Winter",
        "bestOccasion": "Niche Events",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Aurélien Guichard",
        "originalPrice": 1300,
        "pros": [
            "Ultra-realistic raw smoke"
        ],
        "cons": [
            "Too intense for office"
        ],
        "comment": "Tar-heavy leather for aficionados.",
        "profession": "Biker",
        "persona": "Rebellious individualistic spirit.",
        "isTopPick": false
    },
    {
        "id": "p80",
        "name": "Cuir Intense",
        "brand": "Guerlain",
        "category": "Best Leather",
        "gender": "Unisex",
        "olfactoryFamily": "Leather",
        "keyNotes": "Leather, Osmanthus, Oud",
        "whenToWear": "Winter",
        "bestOccasion": "Formal",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Thierry Wasser",
        "originalPrice": 900,
        "pros": [
            "Beast-mode performance"
        ],
        "cons": [
            "Animalic"
        ],
        "comment": "Rugged harsh desert leather.",
        "profession": "Equestrian",
        "persona": "Bold untamed outdoorsman.",
        "isTopPick": false
    },
    {
        "id": "p81",
        "name": "Deified Tony Iommi Parfum",
        "brand": "Xerjoff",
        "category": "Best Leather",
        "gender": "Unisex",
        "olfactoryFamily": "Leather",
        "keyNotes": "Saffron, Leather, Rose",
        "whenToWear": "Winter",
        "bestOccasion": "Concerts",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2024,
        "perfumer": "Chris Maurice",
        "originalPrice": 1400,
        "pros": [
            "Dark gothic rich"
        ],
        "cons": [
            "Heavy"
        ],
        "comment": "Gothic jacket steeped in roses.",
        "profession": "Rocker",
        "persona": "Bold unapologetic rocker.",
        "isTopPick": false
    },
    {
        "id": "p82",
        "name": "Forever Wanted Elixir",
        "brand": "Azzaro",
        "category": "Best Leather",
        "gender": "Male",
        "olfactoryFamily": "Amber Spicy",
        "keyNotes": "Leather, Spices, Woods",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Clubbing",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2025,
        "perfumer": "Azzaro",
        "originalPrice": 500,
        "pros": [
            "Mass-appealing"
        ],
        "cons": [
            "Generic"
        ],
        "comment": "Sweet spicy leather.",
        "profession": "Sales Rep",
        "persona": "Talkative fun guy.",
        "isTopPick": false
    },
    {
        "id": "p83",
        "name": "Cuir InfraRouge",
        "brand": "Maison Crivelli",
        "category": "Best Leather",
        "gender": "Unisex",
        "olfactoryFamily": "Leather",
        "keyNotes": "Leather, Raspberry",
        "whenToWear": "Autumn",
        "bestOccasion": "Art Galleries",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2024,
        "perfumer": "Jordi Fernández",
        "originalPrice": 1050,
        "pros": [
            "Amazing fruit-dark contrast"
        ],
        "cons": [
            "Pricey"
        ],
        "comment": "Neon-raspberry spilled on black leather.",
        "profession": "Photographer",
        "persona": "Artsy edgy creative.",
        "isTopPick": false
    },
    {
        "id": "p84",
        "name": "Aventus",
        "brand": "Creed",
        "category": "Best Men's All Time",
        "gender": "Male",
        "olfactoryFamily": "Fruity Chypre",
        "keyNotes": "Pineapple, Birch, Musk",
        "whenToWear": "All Seasons",
        "bestOccasion": "Power Lunches",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2010,
        "perfumer": "J. Hérault",
        "originalPrice": 1300,
        "pros": [
            "King of men's niche"
        ],
        "cons": [
            "Batch inconsistencies"
        ],
        "comment": "Crisp smoky pineapple success.",
        "profession": "Entrepreneur",
        "persona": "Ambitious driven alpha.",
        "isTopPick": false
    },
    {
        "id": "p85",
        "name": "La Nuit de l'Homme",
        "brand": "YSL",
        "category": "Best Men's All Time",
        "gender": "Male",
        "olfactoryFamily": "Woody Spicy",
        "keyNotes": "Cardamom, Lavender",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Intimate Dates",
        "longevity": "Moderate",
        "sillage": "Moderate",
        "year": 2009,
        "perfumer": "Anne Flipo",
        "originalPrice": 500,
        "pros": [
            "Most seductive designer"
        ],
        "cons": [
            "Weak longevity"
        ],
        "comment": "Warm spicy cardamom cloud.",
        "profession": "Writer",
        "persona": "Charming mysterious soul.",
        "isTopPick": false
    },
    {
        "id": "p86",
        "name": "XJ 1861 Naxos",
        "brand": "Xerjoff",
        "category": "Best Men's All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Aromatic Spicy",
        "keyNotes": "Honey, Tobacco",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Lounges",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2015,
        "perfumer": "Chris Maurice",
        "originalPrice": 950,
        "pros": [
            "Incredible honey-tobacco blend"
        ],
        "cons": [
            "Very loud"
        ],
        "comment": "Wealthy syrupy cigar lounge.",
        "profession": "Business Owner",
        "persona": "Powerful charismatic extrovert.",
        "isTopPick": false
    },
    {
        "id": "p87",
        "name": "Layton",
        "brand": "Parfums de Marly",
        "category": "Best Men's All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Floral",
        "keyNotes": "Apple, Vanilla, Cardamom",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Evening Dates",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2016,
        "perfumer": "H. Merati-Kashani",
        "originalPrice": 1100,
        "pros": [
            "Ultimate compliment magnet"
        ],
        "cons": [
            "Menthol opening"
        ],
        "comment": "Sweet spicy baked apple pie.",
        "profession": "Surgeon",
        "persona": "Wealthy charming individual.",
        "isTopPick": false
    },
    {
        "id": "p88",
        "name": "Le Male Le Parfum",
        "brand": "JPG",
        "category": "Best Men's All Time",
        "gender": "Male",
        "olfactoryFamily": "Amber",
        "keyNotes": "Cardamom, Lavender",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Clubs",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2020,
        "perfumer": "Quentin Bisch",
        "originalPrice": 500,
        "pros": [
            "Smooth mass-appealing"
        ],
        "cons": [
            "Redundant to others"
        ],
        "comment": "Mature dark spicy upgrade.",
        "profession": "Influencer",
        "persona": "Stylish modern gentleman.",
        "isTopPick": false
    },
    {
        "id": "p89",
        "name": "Coco Mademoiselle",
        "brand": "Chanel",
        "category": "Best Women's All Time",
        "gender": "Female",
        "olfactoryFamily": "Amber Floral",
        "keyNotes": "Orange, Rose, Patchouli",
        "whenToWear": "All Seasons",
        "bestOccasion": "Signature Wear",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2001,
        "perfumer": "Jacques Polge",
        "originalPrice": 700,
        "pros": [
            "Put-together fragrance"
        ],
        "cons": [
            "Very ubiquitous"
        ],
        "comment": "Classy effervescent patchouli-citrus.",
        "profession": "Manager",
        "persona": "Organized elegant successful woman.",
        "isTopPick": false
    },
    {
        "id": "p90",
        "name": "Mon Guerlain",
        "brand": "Guerlain",
        "category": "Best Women's All Time",
        "gender": "Female",
        "olfactoryFamily": "Amber Woody",
        "keyNotes": "Lavender, Vanilla",
        "whenToWear": "Spring, Autumn",
        "bestOccasion": "Cozy Brunches",
        "longevity": "Long lasting",
        "sillage": "Moderate",
        "year": 2017,
        "perfumer": "Thierry Wasser",
        "originalPrice": 650,
        "pros": [
            "Comforting wife-material"
        ],
        "cons": [
            "Can feel too safe"
        ],
        "comment": "Glowing maternal lavender hug.",
        "profession": "Teacher",
        "persona": "Warm nurturing elegant woman.",
        "isTopPick": false
    },
    {
        "id": "p91",
        "name": "Alien",
        "brand": "Mugler",
        "category": "Best Women's All Time",
        "gender": "Female",
        "olfactoryFamily": "Amber Woody",
        "keyNotes": "Jasmine, Cashmeran",
        "whenToWear": "Winter",
        "bestOccasion": "Clubbing",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2005,
        "perfumer": "Dominique Ropion",
        "originalPrice": 600,
        "pros": [
            "Nuclear otherworldly jasmine"
        ],
        "cons": [
            "Polarizing"
        ],
        "comment": "Massive intergalactic white floral.",
        "profession": "Fashion Designer",
        "persona": "Fiercely independent trendsetter.",
        "isTopPick": false
    },
    {
        "id": "p92",
        "name": "Dior Addict",
        "brand": "Dior",
        "category": "Best Women's All Time",
        "gender": "Female",
        "olfactoryFamily": "Amber Floral",
        "keyNotes": "Blackberry, Jasmine",
        "whenToWear": "Winter",
        "bestOccasion": "Evening Dates",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2002,
        "perfumer": "Thierry Wasser",
        "originalPrice": 750,
        "pros": [
            "Dark sexy and rich"
        ],
        "cons": [
            "Overwhelming indoors"
        ],
        "comment": "Seductive smoky vanilla floral.",
        "profession": "Artist",
        "persona": "Seductive night-owl.",
        "isTopPick": false
    },
    {
        "id": "p93",
        "name": "L'Interdit EDP Rouge",
        "brand": "Givenchy",
        "category": "Best Women's All Time",
        "gender": "Female",
        "olfactoryFamily": "Amber Floral",
        "keyNotes": "Blood Orange, Tuberose",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Holiday Parties",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2021,
        "perfumer": "Dominique Ropion",
        "originalPrice": 550,
        "pros": [
            "Spicy sweet addictive"
        ],
        "cons": [
            "Ginger opening sharp"
        ],
        "comment": "Spicy sultry red-carpet tuberose.",
        "profession": "Event Planner",
        "persona": "Fiery passionate extrovert.",
        "isTopPick": false
    },
    {
        "id": "p94",
        "name": "Portrait of a Lady",
        "brand": "Frederic Malle",
        "category": "Best Women's All Time",
        "gender": "Female",
        "olfactoryFamily": "Amber Floral",
        "keyNotes": "Rose, Patchouli, Incense",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "High-Society",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2010,
        "perfumer": "Dominique Ropion",
        "originalPrice": 1400,
        "pros": [
            "Masterpiece of modern perfumery"
        ],
        "cons": [
            "Intimidating mature"
        ],
        "comment": "Gothic majestic rose in incense.",
        "profession": "Gallery Owner",
        "persona": "Authoritative intimidating chic woman.",
        "isTopPick": false
    },
    {
        "id": "p95",
        "name": "Ani",
        "brand": "Nishane",
        "category": "Best Niche All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Floral",
        "keyNotes": "Vanilla, Ginger",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Evening Dates",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2019,
        "perfumer": "Cécile Zarokian",
        "originalPrice": 850,
        "pros": [
            "Unique green spicy vanilla"
        ],
        "cons": [
            "Lemon cake opening"
        ],
        "comment": "Massive spicy ginger-vanilla room filler.",
        "profession": "Chef",
        "persona": "Bold inviting personality.",
        "isTopPick": false
    },
    {
        "id": "p96",
        "name": "Bois Impérial",
        "brand": "Essential Parfums",
        "category": "Best Niche All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Woody Aromatic",
        "keyNotes": "Akigalawood, Vetiver",
        "whenToWear": "All Seasons",
        "bestOccasion": "Office Wear",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2020,
        "perfumer": "Quentin Bisch",
        "originalPrice": 350,
        "pros": [
            "Unbeatable value"
        ],
        "cons": [
            "Linear"
        ],
        "comment": "Sharp clean metallic wood.",
        "profession": "Engineer",
        "persona": "Precise effective professional.",
        "isTopPick": false
    },
    {
        "id": "p97",
        "name": "Musc Ravageur",
        "brand": "Frederic Malle",
        "category": "Best Niche All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Amber",
        "keyNotes": "Musk, Vanilla, Cinnamon",
        "whenToWear": "Winter",
        "bestOccasion": "Intimate Dates",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2000,
        "perfumer": "Maurice Roucel",
        "originalPrice": 1100,
        "pros": [
            "Animalic daring sexy"
        ],
        "cons": [
            "Dirty to some noses"
        ],
        "comment": "Dirty spicy musky vanilla.",
        "profession": "Writer",
        "persona": "Sensual confident artistic soul.",
        "isTopPick": false
    },
    {
        "id": "p98",
        "name": "Gris Charnel Extrait",
        "brand": "BDK Parfums",
        "category": "Best Niche All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Woody Spicy",
        "keyNotes": "Fig, Black Tea, Sandalwood",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Cozy Indoors",
        "longevity": "Long lasting",
        "sillage": "Strong",
        "year": 2022,
        "perfumer": "Mathilde Bijaoui",
        "originalPrice": 1100,
        "pros": [
            "Exceptionally smooth creamy"
        ],
        "cons": [
            "Very dense"
        ],
        "comment": "Spiced chai in a cashmere blanket.",
        "profession": "Author",
        "persona": "Calm comforting person.",
        "isTopPick": false
    },
    {
        "id": "p99",
        "name": "Vibrato",
        "brand": "Sospiro",
        "category": "Best Niche All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Citrus",
        "keyNotes": "Grapefruit, Ginger",
        "whenToWear": "Summer",
        "bestOccasion": "Luxury Vacations",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2022,
        "perfumer": "C. Provenzano",
        "originalPrice": 1200,
        "pros": [
            "Sparkling Tygar alternative"
        ],
        "cons": [
            "High price"
        ],
        "comment": "Effervescent wealthy grapefruit.",
        "profession": "Pilot",
        "persona": "Energetic wealthy go-getter.",
        "isTopPick": false
    },
    {
        "id": "p100",
        "name": "02 L'Air du Desert Marocain",
        "brand": "Tauer",
        "category": "Best Niche All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Spicy",
        "keyNotes": "Coriander, Cumin, Amber",
        "whenToWear": "Autumn, Winter",
        "bestOccasion": "Niche Meetups",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2005,
        "perfumer": "Andy Tauer",
        "originalPrice": 650,
        "pros": [
            "Absolute work of art"
        ],
        "cons": [
            "Cumin smells like sweat"
        ],
        "comment": "Dry spicy Moroccan desert night.",
        "profession": "Explorer",
        "persona": "Traveled philosophical rustic individual.",
        "isTopPick": false
    },
    {
        "id": "p101",
        "name": "Alexandria II",
        "brand": "Xerjoff",
        "category": "Best Niche All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Amber Woody",
        "keyNotes": "Lavender, Oud, Sandalwood",
        "whenToWear": "Winter",
        "bestOccasion": "High-End Galas",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2012,
        "perfumer": "Chris Maurice",
        "originalPrice": 2200,
        "pros": [
            "Pure unadulterated luxury"
        ],
        "cons": [
            "Exorbitant"
        ],
        "comment": "Ultimate statement of wealth.",
        "profession": "Royalty",
        "persona": "Elite powerful figure.",
        "isTopPick": false
    },
    {
        "id": "p102",
        "name": "Hacivat",
        "brand": "Nishane",
        "category": "Best Niche All Time",
        "gender": "Unisex",
        "olfactoryFamily": "Chypre Fruity",
        "keyNotes": "Pineapple, Oakmoss",
        "whenToWear": "Spring, Summer",
        "bestOccasion": "Signature Wear",
        "longevity": "Eternal",
        "sillage": "Enormous",
        "year": 2017,
        "perfumer": "Jorge Lee",
        "originalPrice": 950,
        "pros": [
            "Incredible fresh performance"
        ],
        "cons": [
            "Can turn sour"
        ],
        "comment": "Massive earthy pineapple bomb.",
        "profession": "Sales Exec",
        "persona": "Confident visible leader.",
        "isTopPick": false
    }
,
    {
    "id": "bs-0",
    "name": "Baccarat Rouge 540 EDP",
    "brand": "Maison Francis Kurkdjian",
    "category": "Niche",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Saffron, Jasmine, Amberwood, Fir Resin",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Evening, Dates",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2015,
    "perfumer": "Francis Kurkdjian",
    "originalPrice": 1100,
    "pros": [
        "Massive compliment getter"
    ],
    "cons": [
        "Highly ubiquitous"
    ],
    "comment": "A modern legend; sweet, airy, and metallic.",
    "profession": "Entrepreneur",
    "persona": "Elegant, Wealthy",
    "isTopPick": true
},
    {
    "id": "bs-1",
    "name": "Blue Talisman",
    "brand": "Ex Nihilo",
    "category": "Niche",
    "gender": "Unisex",
    "olfactoryFamily": "Woody Fruity",
    "keyNotes": "Pear, Bergamot, Musk, Akigalawood",
    "whenToWear": "All Year",
    "bestOccasion": "Signature Scent",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2023,
    "perfumer": "Jordi Fernández",
    "originalPrice": 1250,
    "pros": [
        "Incredibly fresh and unique"
    ],
    "cons": [
        "High price point"
    ],
    "comment": "A modern, high-end fruity-wood signature.",
    "profession": "Creative Director",
    "persona": "Trendy, Sophisticated",
    "isTopPick": true
},
    {
    "id": "bs-2",
    "name": "Invictus EDT",
    "brand": "Paco Rabanne",
    "category": "Designer",
    "gender": "Male",
    "olfactoryFamily": "Woody Aquatic",
    "keyNotes": "Grapefruit, Marine Notes, Bay Leaf",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Casual, Gym",
    "longevity": "Moderate",
    "sillage": "Strong",
    "year": 2013,
    "perfumer": "V. Nyberg, A. Flipo",
    "originalPrice": 400,
    "pros": [
        "Mass appealing; great starter"
    ],
    "cons": [
        "Can smell synthetic"
    ],
    "comment": "The ultimate youthful, energetic \"shower fresh\" scent.",
    "profession": "Athlete",
    "persona": "Energetic, Youthful",
    "isTopPick": true
},
    {
    "id": "bs-3",
    "name": "Black Sea",
    "brand": "Lorenzo Pazzaglia",
    "category": "Niche",
    "gender": "Unisex",
    "olfactoryFamily": "Aromatic Aquatic",
    "keyNotes": "Salt, Sea Notes, Ozone, Ambergris",
    "whenToWear": "Summer",
    "bestOccasion": "Beach, Casual",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2019,
    "perfumer": "Lorenzo Pazzaglia",
    "originalPrice": 650,
    "pros": [
        "Beast-mode aquatic performance"
    ],
    "cons": [
        "Too salty for some"
    ],
    "comment": "An ultra-realistic, deep, and dark stormy ocean.",
    "profession": "Sailor / Adventurer",
    "persona": "Bold, Free-spirited",
    "isTopPick": true
},
    {
    "id": "bs-4",
    "name": "Wavechild",
    "brand": "Room 1015",
    "category": "Niche",
    "gender": "Unisex",
    "olfactoryFamily": "Citrus Aquatic",
    "keyNotes": "Watermelon, Coconut, Ambergris",
    "whenToWear": "Summer",
    "bestOccasion": "Vacation, Beach",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 2023,
    "perfumer": "Jerome Epinette",
    "originalPrice": 550,
    "pros": [
        "Fun, realistic watermelon note"
    ],
    "cons": [
        "Fleeting longevity"
    ],
    "comment": "A playful, carefree summer scent in a bottle.",
    "profession": "Surfer / Artist",
    "persona": "Chill, Carefree",
    "isTopPick": true
},
    {
    "id": "bs-5",
    "name": "Wanderlust",
    "brand": "Omanluxury",
    "category": "Niche",
    "gender": "Unisex",
    "olfactoryFamily": "Fruity Green",
    "keyNotes": "Lemon, Blackcurrant, Fig, Cedar",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Daytime, Office",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2020,
    "perfumer": "Jean-Louis Sieuzac",
    "originalPrice": 850,
    "pros": [
        "Very green, fresh, and crisp"
    ],
    "cons": [
        "Sharp opening"
    ],
    "comment": "An excellent, refined summer niche option.",
    "profession": "Photographer",
    "persona": "Adventurous, Refined",
    "isTopPick": true
},
    {
    "id": "bs-6",
    "name": "Le Gemme Tygar",
    "brand": "Bvlgari",
    "category": "Niche",
    "gender": "Male",
    "olfactoryFamily": "Citrus Woody",
    "keyNotes": "Grapefruit, Ambroxan, Woody Notes",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Signature, Office",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2016,
    "perfumer": "Jacques Cavallier",
    "originalPrice": 1550,
    "pros": [
        "Ultra-luxurious and effervescent"
    ],
    "cons": [
        "Very expensive"
    ],
    "comment": "The undisputed king of premium fresh fragrances.",
    "profession": "Executive",
    "persona": "Powerful, Charismatic",
    "isTopPick": true
},
    {
    "id": "bs-7",
    "name": "Imagination",
    "brand": "Louis Vuitton",
    "category": "Niche",
    "gender": "Male",
    "olfactoryFamily": "Citrus Aromatic",
    "keyNotes": "Citron, Black Tea, Ambroxan",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Daytime, Office",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2021,
    "perfumer": "Jacques Cavallier",
    "originalPrice": 1300,
    "pros": [
        "Clean, soapy, uplifting tea note"
    ],
    "cons": [
        "High price point"
    ],
    "comment": "Arguably the best fresh release from LV.",
    "profession": "CEO / Consultant",
    "persona": "Clean, Polished",
    "isTopPick": true
},
    {
    "id": "bs-8",
    "name": "Y Eau de Parfum",
    "brand": "YSL",
    "category": "Designer",
    "gender": "Male",
    "olfactoryFamily": "Aromatic Fougere",
    "keyNotes": "Apple, Sage, Woods, Tonka Bean",
    "whenToWear": "All Year",
    "bestOccasion": "Versatile, Clubbing",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2018,
    "perfumer": "Dominique Ropion",
    "originalPrice": 550,
    "pros": [
        "Extremely versatile; performs well"
    ],
    "cons": [
        "A bit common/synthetic"
    ],
    "comment": "The ultimate modern \"blue\" fragrance.",
    "profession": "Tech Bro / Manager",
    "persona": "Confident, Outgoing",
    "isTopPick": true
},
    {
    "id": "bs-9",
    "name": "Megamare",
    "brand": "Orto Parisi",
    "category": "Niche",
    "gender": "Unisex",
    "olfactoryFamily": "Aromatic Aquatic",
    "keyNotes": "Seaweed, Water Notes, Musk",
    "whenToWear": "Summer/All Year",
    "bestOccasion": "Outdoor Statement",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2019,
    "perfumer": "Alessandro Gualtieri",
    "originalPrice": 750,
    "pros": [
        "Nuclear longevity and projection"
    ],
    "cons": [
        "Highly polarizing"
    ],
    "comment": "A challenging, deep, and mysterious dark marine scent.",
    "profession": "Marine Biologist",
    "persona": "Edgy, Mysterious",
    "isTopPick": true
},
    {
    "id": "bs-10",
    "name": "Tonka Cola",
    "brand": "Mancera",
    "category": "Niche",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Spicy",
    "keyNotes": "Cherry, Cola, Cinnamon, Tonka",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Night Out, Casual",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2022,
    "perfumer": "Pierre Montale",
    "originalPrice": 550,
    "pros": [
        "Highly unique, fizzy cola note"
    ],
    "cons": [
        "Can be overly sweet"
    ],
    "comment": "A fun, gourmand twist that smells like cherry cola.",
    "profession": "DJ / Bartender",
    "persona": "Fun, Quirky",
    "isTopPick": true
},
    {
    "id": "bs-11",
    "name": "Fig Infusion",
    "brand": "Essential Parfums",
    "category": "Niche",
    "gender": "Unisex",
    "olfactoryFamily": "Woody Fruity",
    "keyNotes": "Fig, Black Tea, Sandalwood",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Relaxing, Casual",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 2022,
    "perfumer": "Nathalie Lorson",
    "originalPrice": 350,
    "pros": [
        "Affordable niche; very comforting"
    ],
    "cons": [
        "Average performance"
    ],
    "comment": "A calming, creamy, and green fig experience.",
    "profession": "Writer / Designer",
    "persona": "Calm, Intellectual",
    "isTopPick": true
},
    {
    "id": "bs-12",
    "name": "Angels' Share On The Rocks",
    "brand": "By Kilian",
    "category": "Niche",
    "gender": "Unisex",
    "olfactoryFamily": "Oriental Woody",
    "keyNotes": "Grapefruit, Ice Accord, Cognac, Cinnamon, Tonka",
    "whenToWear": "Fall/Winter/Spring",
    "bestOccasion": "Evening, Upscale Events",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2025,
    "perfumer": "Benoist Lapouza",
    "originalPrice": 1350,
    "pros": [
        "Beautiful fresh, icy contrast to the warm original"
    ],
    "cons": [
        "High price point"
    ],
    "comment": "A bright, effervescent, and chilled citrus take on the iconic boozy DNA.",
    "profession": "Executive",
    "persona": "Sophisticated, Modern",
    "isTopPick": true
},
    {
    "id": "bs-13",
    "name": "Aventus EDP",
    "brand": "Creed",
    "category": "Niche",
    "gender": "Male",
    "olfactoryFamily": "Chypre Fruity",
    "keyNotes": "Pineapple, Birch, Musk, Oakmoss",
    "whenToWear": "All Year",
    "bestOccasion": "Signature, Office",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 2010,
    "perfumer": "J. Hérault, E. Creed",
    "originalPrice": 1350,
    "pros": [
        "Legendary, mass-appealing DNA"
    ],
    "cons": [
        "Batch variations; pricey"
    ],
    "comment": "The modern king of men's perfumery.",
    "profession": "Entrepreneur",
    "persona": "Alpha, Successful",
    "isTopPick": true
},
    {
    "id": "bs-14",
    "name": "Bleu de Chanel EDP",
    "brand": "Chanel",
    "category": "Designer",
    "gender": "Male",
    "olfactoryFamily": "Woody Aromatic",
    "keyNotes": "Grapefruit, Incense, Ginger, Woods",
    "whenToWear": "All Year",
    "bestOccasion": "Signature, Office",
    "longevity": "Long-lasting",
    "sillage": "Moderate",
    "year": 2014,
    "perfumer": "Jacques Polge",
    "originalPrice": 600,
    "pros": [
        "Perfectly balanced and classy"
    ],
    "cons": [
        "Very widely worn"
    ],
    "comment": "The gold standard for the modern professional man.",
    "profession": "Lawyer / Doctor",
    "persona": "Professional, Classy",
    "isTopPick": true
},
    {
    "id": "bs-15",
    "name": "Good Girl EDP",
    "brand": "Carolina Herrera",
    "category": "Designer",
    "gender": "Female",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Almond, Tuberose, Tonka, Cocoa",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Date Night, Clubbing",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2016,
    "perfumer": "Louise Turner",
    "originalPrice": 550,
    "pros": [
        "Sexy, alluring, and rich"
    ],
    "cons": [
        "Stiletto bottle is polarizing"
    ],
    "comment": "A fantastic, sweet evening scent with great presence.",
    "profession": "PR Manager",
    "persona": "Sassy, Confident",
    "isTopPick": true
},
    {
    "id": "bs-16",
    "name": "Coco Mademoiselle",
    "brand": "Chanel",
    "category": "Designer",
    "gender": "Female",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Orange, Patchouli, Rose",
    "whenToWear": "All Year",
    "bestOccasion": "Signature, Office",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2001,
    "perfumer": "Jacques Polge",
    "originalPrice": 700,
    "pros": [
        "Elegant, timeless, and bright"
    ],
    "cons": [
        "Extremely common"
    ],
    "comment": "A flawless modern classic for women.",
    "profession": "Realtor / Exec",
    "persona": "Chic, Independent",
    "isTopPick": true
},
    {
    "id": "bs-17",
    "name": "Miss Dior EDP",
    "brand": "Dior",
    "category": "Designer",
    "gender": "Female",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Iris, Peony, Rose, Vanilla",
    "whenToWear": "Spring / All Year",
    "bestOccasion": "Daytime, Romantic",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 2021,
    "perfumer": "François Demachy",
    "originalPrice": 700,
    "pros": [
        "Sweet, pretty, and highly feminine"
    ],
    "cons": [
        "Has been reformulated often"
    ],
    "comment": "A beautiful, powdery, and romantic floral bouquet.",
    "profession": "Wedding Planner",
    "persona": "Sweet, Graceful",
    "isTopPick": true
},
    {
    "id": "bs-18",
    "name": "Flora Gorgeous Gardenia",
    "brand": "Gucci",
    "category": "Designer",
    "gender": "Female",
    "olfactoryFamily": "Floral",
    "keyNotes": "Pear Blossom, Gardenia, Brown Sugar",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Daytime, Casual",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 2021,
    "perfumer": "H. Blanc, A. Morillas",
    "originalPrice": 600,
    "pros": [
        "Beautifully uplifting and happy"
    ],
    "cons": [
        "Short-lived longevity"
    ],
    "comment": "The perfect joyful, sweet spring scent.",
    "profession": "Florist / Stylist",
    "persona": "Joyful, Radiant",
    "isTopPick": true
},
    {
    "id": "bs-19",
    "name": "Love, Don't Be Shy",
    "brand": "By Kilian",
    "category": "Niche",
    "gender": "Female",
    "olfactoryFamily": "Amber",
    "keyNotes": "Neroli, Orange Blossom, Marshmallow",
    "whenToWear": "Fall/Winter/Spring",
    "bestOccasion": "Dates, Special Events",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2007,
    "perfumer": "Calice Becker",
    "originalPrice": 1100,
    "pros": [
        "Intoxicatingly sweet and sexy"
    ],
    "cons": [
        "Can be too syrupy for some"
    ],
    "comment": "Famous as \"Rihanna's perfume\"; a marshmallow dream.",
    "profession": "Singer / Influencer",
    "persona": "Sweet, Flirtatious",
    "isTopPick": true
},
    {
    "id": "na-0",
    "name": "Outlands",
    "brand": "Amouge",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Woody Aromatic",
    "keyNotes": "Woods, Spices, Earthy Notes",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Evening",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 2025,
    "perfumer": "N/A",
    "originalPrice": 400,
    "pros": [
        "Unique niche profile"
    ],
    "cons": [
        "Hard to find"
    ],
    "comment": "A rare or boutique offering with limited mainstream data.",
    "profession": "Explorer",
    "persona": "Enigmatic",
    "isTopPick": false
},
    {
    "id": "na-1",
    "name": "Black Sea",
    "brand": "Lorenzo Pazzaglia",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Aromatic Aquatic",
    "keyNotes": "Salt, Sea Notes, Ozone, Ambergris",
    "whenToWear": "Summer",
    "bestOccasion": "Beach, Casual",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2019,
    "perfumer": "Lorenzo Pazzaglia",
    "originalPrice": 650,
    "pros": [
        "Beast-mode aquatic performance"
    ],
    "cons": [
        "Too salty for some"
    ],
    "comment": "An ultra-realistic, deep, and dark stormy ocean.",
    "profession": "Sailor",
    "persona": "Bold, Free-spirited",
    "isTopPick": false
},
    {
    "id": "na-2",
    "name": "Wavechild",
    "brand": "Room 1015",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Citrus Aquatic",
    "keyNotes": "Watermelon, Coconut, Ambergris",
    "whenToWear": "Summer",
    "bestOccasion": "Vacation, Beach",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 2023,
    "perfumer": "Jerome Epinette",
    "originalPrice": 550,
    "pros": [
        "Fun, realistic watermelon note"
    ],
    "cons": [
        "Fleeting longevity"
    ],
    "comment": "A playful, carefree summer scent in a bottle.",
    "profession": "Surfer / Artist",
    "persona": "Chill, Carefree",
    "isTopPick": false
},
    {
    "id": "na-3",
    "name": "Blanche Bête",
    "brand": "Les Liquides Imaginaires",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Floral Woody Musk",
    "keyNotes": "Milk, Tuberose, Vanilla, Cacao",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Cozy Days, Dates",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2021,
    "perfumer": "Louise Turner",
    "originalPrice": 1100,
    "pros": [
        "Incredibly creamy, dreamy, and lactonic"
    ],
    "cons": [
        "Milky notes can be cloying"
    ],
    "comment": "Smells like a mythical, luxurious white chocolate cloud.",
    "profession": "Illustrator",
    "persona": "Ethereal, Gentle",
    "isTopPick": false
},
    {
    "id": "na-4",
    "name": "Crying of Evil",
    "brand": "Stéphane Humbert Lucas",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Spices, Tuberose, Leather, Amber",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Evening, Formal",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2022,
    "perfumer": "Stéphane Humbert Lucas",
    "originalPrice": 1200,
    "pros": [
        "Dark, mysterious, and beautifully blended"
    ],
    "cons": [
        "Very heavy"
    ],
    "comment": "A gothic, sensual, and spicy leather-floral masterpiece.",
    "profession": "Creative Director",
    "persona": "Mysterious, Edgy",
    "isTopPick": false
},
    {
    "id": "na-5",
    "name": "Wanderlust",
    "brand": "Oman Luxury",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Fruity Green",
    "keyNotes": "Lemon, Blackcurrant, Fig, Cedar",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Daytime, Office",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2020,
    "perfumer": "Jean-Louis Sieuzac",
    "originalPrice": 850,
    "pros": [
        "Very green, fresh, and crisp"
    ],
    "cons": [
        "Sharp opening"
    ],
    "comment": "An excellent, refined summer niche option.",
    "profession": "Photographer",
    "persona": "Adventurous",
    "isTopPick": false
},
    {
    "id": "na-6",
    "name": "Molecule 02",
    "brand": "Escentric Molecules",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber",
    "keyNotes": "Ambroxan",
    "whenToWear": "All Year",
    "bestOccasion": "Layering, Signature",
    "longevity": "Moderate",
    "sillage": "Intimate",
    "year": 2008,
    "perfumer": "Geza Schoen",
    "originalPrice": 550,
    "pros": [
        "Enhances other perfumes perfectly"
    ],
    "cons": [
        "Some people are nose-blind to it"
    ],
    "comment": "A pure, skin-like aura rather than a traditional perfume.",
    "profession": "Architect",
    "persona": "Minimalist",
    "isTopPick": false
},
    {
    "id": "na-7",
    "name": "Crystal Saffron",
    "brand": "Matiere Premiere",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Spicy",
    "keyNotes": "Saffron, Musk, Ambroxan",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Statement Scent",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2022,
    "perfumer": "Aurelien Guichard",
    "originalPrice": 850,
    "pros": [
        "Bright, crystalline, realistic saffron"
    ],
    "cons": [
        "Very sharp and piercing"
    ],
    "comment": "A loud, modern, and highly addictive saffron bomb.",
    "profession": "Fashion Stylist",
    "persona": "Bold, Trendsetter",
    "isTopPick": false
},
    {
    "id": "na-8",
    "name": "Vanilla Powder",
    "brand": "Matiere Premiere",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Woody",
    "keyNotes": "Vanilla, Coconut, Palo Santo",
    "whenToWear": "All Year",
    "bestOccasion": "Casual, Signature",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2023,
    "perfumer": "Aurelien Guichard",
    "originalPrice": 850,
    "pros": [
        "Dry, non-gourmand, sophisticated vanilla"
    ],
    "cons": [
        "Powdery notes aren't for everyone"
    ],
    "comment": "A beautiful, dusty, and woody take on vanilla.",
    "profession": "Baker / Curator",
    "persona": "Warm, Refined",
    "isTopPick": false
},
    {
    "id": "na-9",
    "name": "Falcon Leather",
    "brand": "Matiere Premiere",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Leather",
    "keyNotes": "Saffron, Birch Tar, Benzoin",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Formal, Evening",
    "longevity": "Eternal",
    "sillage": "Strong",
    "year": 2019,
    "perfumer": "Aurelien Guichard",
    "originalPrice": 850,
    "pros": [
        "Ultra-realistic, smoky, premium leather"
    ],
    "cons": [
        "Very rugged"
    ],
    "comment": "Smells exactly like the inside of a luxury sports car.",
    "profession": "Executive",
    "persona": "Powerful, Assertive",
    "isTopPick": false
},
    {
    "id": "na-10",
    "name": "Irish Leather",
    "brand": "Memo Paris",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Leather",
    "keyNotes": "Juniper Berries, Mate, Leather",
    "whenToWear": "Spring/Fall",
    "bestOccasion": "Signature, Office",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2013,
    "perfumer": "Alienor Massenet",
    "originalPrice": 1050,
    "pros": [
        "Fresh, green, and highly elegant"
    ],
    "cons": [
        "Leather can be a bit harsh initially"
    ],
    "comment": "Evokes a crisp morning horseback ride through the countryside.",
    "profession": "Equestrian",
    "persona": "Classy, Outdoorsy",
    "isTopPick": false
},
    {
    "id": "na-11",
    "name": "Angels' Share On The Rocks",
    "brand": "By Kilian",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Oriental Woody",
    "keyNotes": "Grapefruit, Ice Accord, Cognac, Cinnamon",
    "whenToWear": "Fall/Winter/Spring",
    "bestOccasion": "Evening, Upscale",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2025,
    "perfumer": "Benoist Lapouza",
    "originalPrice": 1350,
    "pros": [
        "Beautiful fresh, icy contrast to the warm original"
    ],
    "cons": [
        "High price point"
    ],
    "comment": "A bright, effervescent, and chilled citrus take on the boozy DNA.",
    "profession": "Investor",
    "persona": "Sophisticated",
    "isTopPick": false
},
    {
    "id": "na-12",
    "name": "Smoking Hot",
    "brand": "By Kilian",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Spicy",
    "keyNotes": "Apple, Hookah Smoke, Tobacco, Vanilla",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Night Out",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2023,
    "perfumer": "Mathieu Nardin",
    "originalPrice": 1100,
    "pros": [
        "Intoxicating apple-shisha vibe"
    ],
    "cons": [
        "Can lean too sweet"
    ],
    "comment": "Perfectly captures the scent of high-end apple hookah.",
    "profession": "Nightclub Owner",
    "persona": "Charismatic",
    "isTopPick": false
},
    {
    "id": "na-13",
    "name": "Bois Impérial",
    "brand": "Essential Parfums",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Woody",
    "keyNotes": "Akigalawood, Vetiver, Basil",
    "whenToWear": "All Year",
    "bestOccasion": "Signature, Office",
    "longevity": "Eternal",
    "sillage": "Strong",
    "year": 2020,
    "perfumer": "Quentin Bisch",
    "originalPrice": 350,
    "pros": [
        "Incredible value; crisp and modern"
    ],
    "cons": [
        "Can smell slightly synthetic"
    ],
    "comment": "A fantastic, metallic, woody-fresh signature scent.",
    "profession": "Consultant",
    "persona": "Sharp, Professional",
    "isTopPick": false
},
    {
    "id": "na-14",
    "name": "Impadia",
    "brand": "BDK Parfums",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Floral Fruity Gourmand",
    "keyNotes": "Pear, Mandarin, Turkish Rose, Vanilla, Akigalawood",
    "whenToWear": "Spring/Fall",
    "bestOccasion": "Signature, Daytime",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2025,
    "perfumer": "Jordi Fernández",
    "originalPrice": 1100,
    "pros": [
        "Mass-appealing, juicy pear & gorgeous rose"
    ],
    "cons": [
        "Can be overpowering; similar to other popular rose scents"
    ],
    "comment": "A radiant, modern fruity-floral that perfectly captures a vibrant Parisian sunset.",
    "profession": "Fashion Editor",
    "persona": "Radiant, Elegant",
    "isTopPick": false
},
    {
    "id": "na-15",
    "name": "Tilia",
    "brand": "Marc-Antoine Barrois",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Floral Woody",
    "keyNotes": "Linden Blossom, Broom, Vetiver",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Daytime, Casual",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2024,
    "perfumer": "Quentin Bisch",
    "originalPrice": 800,
    "pros": [
        "Sunny, optimistic, and beautifully floral"
    ],
    "cons": [
        "High pollen-like scent profile"
    ],
    "comment": "A radiant, modern floral that smells like a warm summer day.",
    "profession": "Florist / Stylist",
    "persona": "Joyful, Radiant",
    "isTopPick": false
},
    {
    "id": "na-16",
    "name": "Oud Maracujá",
    "brand": "Maison Crivelli",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Leather Fruity",
    "keyNotes": "Passionfruit, Oud, Saffron, Leather",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Evening, Statement",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2023,
    "perfumer": "Jordi Fernández",
    "originalPrice": 1100,
    "pros": [
        "Brilliant contrast of tropical and dark"
    ],
    "cons": [
        "Oud is very dominant"
    ],
    "comment": "A loud, polarizing, but stunning tropical oud masterpiece.",
    "profession": "Art Dealer",
    "persona": "Avant-Garde",
    "isTopPick": false
},
    {
    "id": "na-17",
    "name": "LV Lovers",
    "brand": "Louis Vuitton",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Woody Floral",
    "keyNotes": "Galbanum, Cedar, Sandalwood",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Casual, Daytime",
    "longevity": "Long-lasting",
    "sillage": "Moderate",
    "year": 2024,
    "perfumer": "Jacques Cavallier",
    "originalPrice": 1300,
    "pros": [
        "Smooth, uplifting, and incredibly classy"
    ],
    "cons": [
        "High price point"
    ],
    "comment": "A bright, green, and woody scent that oozes quiet luxury.",
    "profession": "Tech Founder",
    "persona": "Calm, Successful",
    "isTopPick": false
},
    {
    "id": "na-18",
    "name": "Arabians Tonka",
    "brand": "Montale",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Woody",
    "keyNotes": "Saffron, Tonka Bean, Rose, Oud",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Clubbing, Evening",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2019,
    "perfumer": "Pierre Montale",
    "originalPrice": 550,
    "pros": [
        "Nuclear performance; sweet and loud"
    ],
    "cons": [
        "Very aggressive projection"
    ],
    "comment": "The ultimate Middle Eastern-style clubbing fragrance.",
    "profession": "DJ / Promoter",
    "persona": "Loud, Outgoing",
    "isTopPick": false
},
    {
    "id": "na-19",
    "name": "Portrait of a Lady",
    "brand": "Frederic Malle",
    "category": "New Arrivals",
    "gender": "Female*",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Rose, Patchouli, Incense, Clove",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Formal, Special Events",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2010,
    "perfumer": "Dominique Ropion",
    "originalPrice": 1400,
    "pros": [
        "The undisputed queen of rose-patchouli"
    ],
    "cons": [
        "Too mature for some"
    ],
    "comment": "A majestic, gothic, and incredibly wealthy-smelling masterpiece.",
    "profession": "Aristocrat",
    "persona": "Regal, Imposing",
    "isTopPick": false
},
    {
    "id": "na-20",
    "name": "Burberry Weekend",
    "brand": "Burberry",
    "category": "New Arrivals",
    "gender": "Female",
    "olfactoryFamily": "Floral",
    "keyNotes": "Nectarine, Peach Blossom, Mignonette",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Weekend, Casual",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 1997,
    "perfumer": "Nathalie Lorson",
    "originalPrice": 250,
    "pros": [
        "Easy-going, nostalgic, and happy"
    ],
    "cons": [
        "Can feel a bit dated"
    ],
    "comment": "A classic, comforting 90s floral for relaxed days.",
    "profession": "Teacher",
    "persona": "Relaxed, Friendly",
    "isTopPick": false
},
    {
    "id": "na-21",
    "name": "Guidance 46",
    "brand": "Amouage",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Pear, Hazelnut, Rose, Sandalwood",
    "whenToWear": "All Year",
    "bestOccasion": "Statement Scent",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2024,
    "perfumer": "Quentin Bisch",
    "originalPrice": 1800,
    "pros": [
        "Richer, denser version of the hit original"
    ],
    "cons": [
        "Extremely expensive"
    ],
    "comment": "A highly concentrated, creamy, and complex Extrait.",
    "profession": "Socialite",
    "persona": "Luxurious, Captivating",
    "isTopPick": false
},
    {
    "id": "na-22",
    "name": "Le Gemme Tygar",
    "brand": "Bvlgari",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Citrus Woody",
    "keyNotes": "Grapefruit, Ambroxan, Woody Notes",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Signature, Office",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2016,
    "perfumer": "Jacques Cavallier",
    "originalPrice": 1550,
    "pros": [
        "Ultra-luxurious and effervescent"
    ],
    "cons": [
        "Very expensive"
    ],
    "comment": "The undisputed king of premium fresh fragrances.",
    "profession": "CEO",
    "persona": "Powerful, Charismatic",
    "isTopPick": false
},
    {
    "id": "na-23",
    "name": "Imagination",
    "brand": "Louis Vuitton",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Citrus Aromatic",
    "keyNotes": "Citron, Black Tea, Ambroxan",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Daytime, Office",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2021,
    "perfumer": "Jacques Cavallier",
    "originalPrice": 1300,
    "pros": [
        "Clean, soapy, uplifting tea note"
    ],
    "cons": [
        "High price point"
    ],
    "comment": "Arguably the best fresh release from LV.",
    "profession": "Doctor",
    "persona": "Clean, Polished",
    "isTopPick": false
},
    {
    "id": "na-24",
    "name": "Y Eau de Parfum",
    "brand": "YSL",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Aromatic Fougere",
    "keyNotes": "Apple, Sage, Woods, Tonka Bean",
    "whenToWear": "All Year",
    "bestOccasion": "Versatile, Clubbing",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2018,
    "perfumer": "Dominique Ropion",
    "originalPrice": 550,
    "pros": [
        "Extremely versatile; performs well"
    ],
    "cons": [
        "A bit common/synthetic"
    ],
    "comment": "The ultimate modern \"blue\" fragrance.",
    "profession": "Manager",
    "persona": "Confident, Outgoing",
    "isTopPick": false
},
    {
    "id": "na-25",
    "name": "Boss Bottled Elixir",
    "brand": "Hugo Boss",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Amber Woody",
    "keyNotes": "Frankincense, Vetiver, Cedar",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Evening, Formal",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2023,
    "perfumer": "A. Menardo, S. Le Helley",
    "originalPrice": 450,
    "pros": [
        "Dark, resinous, and surprisingly niche-quality"
    ],
    "cons": [
        "Departs heavily from the original DNA"
    ],
    "comment": "A sophisticated, deep incense and woods powerhouse.",
    "profession": "Executive",
    "persona": "Mature, Grounded",
    "isTopPick": false
},
    {
    "id": "na-26",
    "name": "Gentleman Society",
    "brand": "Givenchy",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Woody Floral",
    "keyNotes": "Cardamom, Vetiver, Vanilla, Narcissus",
    "whenToWear": "Fall/Spring",
    "bestOccasion": "Signature, Office",
    "longevity": "Long-lasting",
    "sillage": "Moderate",
    "year": 2023,
    "perfumer": "K. Dubreuil, M. Lernout",
    "originalPrice": 500,
    "pros": [
        "Smooth, modern, and highly versatile"
    ],
    "cons": [
        "Lacks the iris of previous flankers"
    ],
    "comment": "A very safe, contemporary woody-floral for the modern man.",
    "profession": "Banker",
    "persona": "Polished, Suave",
    "isTopPick": false
},
    {
    "id": "na-27",
    "name": "Absolu Aventus",
    "brand": "Creed",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Fruity Spicy",
    "keyNotes": "Grapefruit, Pineapple, Ginger, Patchouli",
    "whenToWear": "All Year",
    "bestOccasion": "Signature",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2023,
    "perfumer": "Creed",
    "originalPrice": 1500,
    "pros": [
        "A richer, darker, spicier take on Aventus"
    ],
    "cons": [
        "Extremely pricey; limited edition"
    ],
    "comment": "Adds a dark, wintery depth to the legendary Aventus DNA.",
    "profession": "Entrepreneur",
    "persona": "Alpha, Successful",
    "isTopPick": false
},
    {
    "id": "na-28",
    "name": "Le Male Elixir",
    "brand": "Jean Paul Gaultier",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Amber Fougere",
    "keyNotes": "Lavender, Tonka, Honey, Tobacco",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Clubbing, Dates",
    "longevity": "Eternal",
    "sillage": "Strong",
    "year": 2023,
    "perfumer": "Quentin Bisch",
    "originalPrice": 500,
    "pros": [
        "Incredibly sweet, seductive, and loud"
    ],
    "cons": [
        "Can be overly cloying"
    ],
    "comment": "A massive compliment magnet for nightlife and winter.",
    "profession": "Model / Athlete",
    "persona": "Seductive, Playful",
    "isTopPick": false
},
    {
    "id": "na-29",
    "name": "Althaïr",
    "brand": "Parfums de Marly",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Amber Vanilla",
    "keyNotes": "Orange Blossom, Vanilla, Praline",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Dates, Evening",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2023,
    "perfumer": "H. Merati-Kashani",
    "originalPrice": 1200,
    "pros": [
        "A beautiful, airy, spicy vanilla"
    ],
    "cons": [
        "Very sweet for a male release"
    ],
    "comment": "A comforting, high-quality gourmand that smells edible.",
    "profession": "Software Dev",
    "persona": "Cozy, Inviting",
    "isTopPick": false
},
    {
    "id": "na-30",
    "name": "Tabac Rose",
    "brand": "BDK Parfums",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Plum, Rose, Tobacco, Chocolate",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Evening",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2020,
    "perfumer": "Julien Rasquinet",
    "originalPrice": 850,
    "pros": [
        "Opulent, jammy, and rich"
    ],
    "cons": [
        "Tobacco is quite dense"
    ],
    "comment": "A beautifully decadent blend of Turkish rose and rich tobacco.",
    "profession": "Sommelier",
    "persona": "Romantic, Deep",
    "isTopPick": false
},
    {
    "id": "na-31",
    "name": "Side Effect",
    "brand": "Initio",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber",
    "keyNotes": "Rum, Vanilla, Tobacco, Cinnamon",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Dates, Night Out",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2016,
    "perfumer": "Maurice Roucel",
    "originalPrice": 1100,
    "pros": [
        "Intoxicating, boozy, and sexy"
    ],
    "cons": [
        "Can overwhelm in tight spaces"
    ],
    "comment": "A dangerous, seductive scent perfect for a night on the town.",
    "profession": "Bartender",
    "persona": "Flirtatious, Bold",
    "isTopPick": false
},
    {
    "id": "na-32",
    "name": "Atomic Rose",
    "brand": "Initio",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Pink Pepper, Rose, Hedione, Vanilla",
    "whenToWear": "All Year",
    "bestOccasion": "Signature, Evening",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2019,
    "perfumer": "Initio",
    "originalPrice": 1100,
    "pros": [
        "Massive projection; modern jammy rose"
    ],
    "cons": [
        "Very loud"
    ],
    "comment": "An explosive, electrified rose that demands attention.",
    "profession": "PR Director",
    "persona": "Confident, Loud",
    "isTopPick": false
},
    {
    "id": "na-33",
    "name": "Radical Rose",
    "brand": "Matiere Premiere",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Floral",
    "keyNotes": "Saffron, Rose, Patchouli",
    "whenToWear": "All Year",
    "bestOccasion": "Signature, Formal",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2020,
    "perfumer": "Aurelien Guichard",
    "originalPrice": 850,
    "pros": [
        "Very realistic, earthy, high-dose rose"
    ],
    "cons": [
        "Patchouli makes it a bit dirty"
    ],
    "comment": "A raw, natural, and incredibly high-quality rose experience.",
    "profession": "Fashion Designer",
    "persona": "Artistic, Grounded",
    "isTopPick": false
},
    {
    "id": "na-34",
    "name": "Baraonda",
    "brand": "Nasomatto",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Woody",
    "keyNotes": "Whiskey, Woods, Ambrette, Rose",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Evening, Upscale",
    "longevity": "Eternal",
    "sillage": "Strong",
    "year": 2016,
    "perfumer": "Alessandro Gualtieri",
    "originalPrice": 999,
    "pros": [
        "Ultra-realistic whiskey note"
    ],
    "cons": [
        "Very small bottle size"
    ],
    "comment": "Smells exactly like spilling an expensive glass of whiskey in a wooden barrel.",
    "profession": "Connoisseur",
    "persona": "Rugged, Sophisticated",
    "isTopPick": false
},
    {
    "id": "na-35",
    "name": "Megamare",
    "brand": "Orto Parisi",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Aromatic Aquatic",
    "keyNotes": "Seaweed, Water Notes, Musk",
    "whenToWear": "Summer/All Year",
    "bestOccasion": "Outdoor Statement",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2019,
    "perfumer": "Alessandro Gualtieri",
    "originalPrice": 750,
    "pros": [
        "Nuclear longevity and projection"
    ],
    "cons": [
        "Highly polarizing"
    ],
    "comment": "A challenging, deep, and mysterious dark marine scent.",
    "profession": "Marine Biologist",
    "persona": "Edgy, Mysterious",
    "isTopPick": false
},
    {
    "id": "na-36",
    "name": "Tonka Cola",
    "brand": "Mancera",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Spicy",
    "keyNotes": "Cherry, Cola, Cinnamon, Tonka",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Night Out, Casual",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2022,
    "perfumer": "Pierre Montale",
    "originalPrice": 550,
    "pros": [
        "Highly unique, fizzy cola note"
    ],
    "cons": [
        "Can be overly sweet"
    ],
    "comment": "A fun, gourmand twist that smells exactly like cherry cola.",
    "profession": "Entertainer",
    "persona": "Fun, Quirky",
    "isTopPick": false
},
    {
    "id": "na-37",
    "name": "Fig Infusion",
    "brand": "Essential Parfums",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Woody Fruity",
    "keyNotes": "Fig, Black Tea, Sandalwood",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Relaxing, Casual",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 2022,
    "perfumer": "Nathalie Lorson",
    "originalPrice": 350,
    "pros": [
        "Affordable niche; very comforting"
    ],
    "cons": [
        "Average performance"
    ],
    "comment": "A calming, creamy, and green fig experience.",
    "profession": "Writer",
    "persona": "Calm, Intellectual",
    "isTopPick": false
},
    {
    "id": "na-38",
    "name": "Allure Homme Sport Superleggera",
    "brand": "Chanel",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Woody Aromatic",
    "keyNotes": "Citrus, Woody Notes, Musk",
    "whenToWear": "Spring/Summer",
    "bestOccasion": "Gym, Casual, Office",
    "longevity": "Moderate",
    "sillage": "Moderate",
    "year": 2024,
    "perfumer": "O. Polge, J. Polge",
    "originalPrice": 650,
    "pros": [
        "Lighter, crisper take on the original"
    ],
    "cons": [
        "Performs like a lighter cologne"
    ],
    "comment": "A modernized, highly refreshing update to a classic sports DNA.",
    "profession": "Athlete",
    "persona": "Active, Fresh",
    "isTopPick": false
},
    {
    "id": "na-39",
    "name": "Gucci Guilty Absolute",
    "brand": "Gucci",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Amber Woody",
    "keyNotes": "Leather, Cypress, Patchouli, Vetiver",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Evening, Formal",
    "longevity": "Long-lasting",
    "sillage": "Strong",
    "year": 2017,
    "perfumer": "Alberto Morillas",
    "originalPrice": 500,
    "pros": [
        "Extremely daring, medicinal, and niche-like"
    ],
    "cons": [
        "Highly polarizing; smells like Band-Aids to some"
    ],
    "comment": "One of the most daring and uncompromising designer releases ever.",
    "profession": "Mechanic / Biker",
    "persona": "Masculine, Unapologetic",
    "isTopPick": false
},
    {
    "id": "na-40",
    "name": "Stronger With You Intensely",
    "brand": "Emporio Armani",
    "category": "New Arrivals",
    "gender": "Male",
    "olfactoryFamily": "Amber Fougere",
    "keyNotes": "Pink Pepper, Toffee, Cinnamon, Vanilla",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Dates, Casual",
    "longevity": "Eternal",
    "sillage": "Enormous",
    "year": 2019,
    "perfumer": "Cecile Matton",
    "originalPrice": 450,
    "pros": [
        "Cozy, sweet, and highly compliment-getting"
    ],
    "cons": [
        "Very sweet and youthful"
    ],
    "comment": "A cozy, toffee-heavy winter staple that performs incredibly well.",
    "profession": "Student",
    "persona": "Sweet, Charming",
    "isTopPick": false
},
    {
    "id": "na-41",
    "name": "Red Wine Brown Sugar",
    "brand": "Bohoboco",
    "category": "New Arrivals",
    "gender": "Unisex",
    "olfactoryFamily": "Amber Vanilla",
    "keyNotes": "Red Wine, Brown Sugar, Patchouli",
    "whenToWear": "Fall/Winter",
    "bestOccasion": "Evening, Cozy",
    "longevity": "Long-lasting",
    "sillage": "Moderate",
    "year": 2016,
    "perfumer": "Michal Gilbert Lach",
    "originalPrice": 600,
    "pros": [
        "Photorealistic sweet wine scent"
    ],
    "cons": [
        "Very specific scent profile"
    ],
    "comment": "A truly unique gourmand that smells exactly like a glass of sweetened red wine.",
    "profession": "Sommelier",
    "persona": "Eccentric, Warm",
    "isTopPick": false
}];

  private calculateImpressionPrice(originalPrice: number): number {
    if (originalPrice > 1500) return 99;
    if (originalPrice > 1000) return 89;
    if (originalPrice > 750) return 79;
    if (originalPrice > 500) return 69;
    return 60;
  }

  products = signal<Product[]>([]);

  constructor() {
    // Initialize products with calculated impression prices
    const processedProducts: Product[] = this.rawProducts.map(p => {
      const baseSlug = `${p.brand}-${p.name}-impression-by-xperfumes`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      return {
        ...p,
        gender: p.gender as 'Male' | 'Female' | 'Unisex',
        impressionPrice: this.calculateImpressionPrice(p.originalPrice),
        slug: baseSlug
      };
    });
    this.products.set(processedProducts);
  }

  getAllProducts(): Product[] {
    return this.products();
  }

  getProductById(id: string): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.products().find(p => p.slug === slug);
  }

  getTopPicks(): Product[] {
    return this.products().filter(p => p.isTopPick);
  }

  getSimilarProducts(product: Product, limit = 3): Product[] {
    return this.products()
      .filter(p => p.id !== product.id && (p.olfactoryFamily === product.olfactoryFamily || p.category === product.category))
      .sort(() => 0.5 - Math.random()) // Simple shuffle
      .slice(0, limit);
  }
}
