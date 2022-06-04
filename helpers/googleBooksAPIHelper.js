const axios = require('axios');

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const { GOOGLE_BOOKS_API_KEY } = require('../config');

const Book = require('../models/book');

async function bookSearch(searchTerms) {
  // const result = await axios.get(
  //   `${API_BASE_URL}?q=${searchTerms}&key=${GOOGLE_BOOKS_API_KEY}`
  // );

  const resData = result.data.items;
  // console.log(resData);
  let books = [];

  for (let i in resData) {
    let googleBook = resData[i];
    // console.log(googleBook);

    let book = {
      external_book_id: googleBook.id,
      book_title: googleBook.volumeInfo.title,
      book_author: googleBook.volumeInfo.authors,
      book_description: googleBook.volumeInfo.description,
      book_genre: googleBook.volumeInfo.categories,
    };
    books.push(book);
  }

  return books;
}

async function getBookDetails(volId) {
  // const result = await axios.get(
  //   `${API_BASE_URL}/${volId}?key=${GOOGLE_BOOKS_API_KEY}`
  // );

  // const resData = result.data;
  let resData = {
    kind: 'books#volumes',
    totalItems: 7,
    items: [
      {
        kind: 'books#volume',
        id: 'zyTCAlFPjgYC',
        etag: 'lOxFeljqoZ0',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC',
        volumeInfo: {
          title: 'The Google Story (2018 Updated Edition)',
          subtitle:
            'Inside the Hottest Business, Media, and Technology Success of Our Time',
          authors: ['David A. Vise', 'Mark Malseed'],
          publisher: 'Bantam',
          publishedDate: '2005-11-15',
          description:
            'The definitive, bestselling account of the company that changed the way we work and live, updated for the twentieth anniversary of Google’s founding with analysis of its most recent bold moves to redefine the world—and its even more ambitious plans for the future. Moscow-born Sergey Brin and Midwest-born Larry Page dropped out of graduate school at Stanford University to, as they said, “change the world” through a powerful search engine that would organize every bit of information on the Web for free. The Google Story takes you deep inside the company’s wild ride from an idea that struggled for funding in 1998 to a firm that today rakes in billions in profits. Based on scrupulous research and extraordinary access to Google, this fast-moving narrative reveals how an unorthodox management style and a culture of innovation enabled a search-engine giant to shake up Madison Avenue, clash with governments that accuse it of being a monopoly, deploy self-driving cars to forever change how we travel, and launch high-flying Internet balloons. Unafraid of controversy, Google is surging ahead with artificial intelligence that could cure diseases but also displace millions of people from their jobs, testing the founders’ guiding mantra: DON’T BE EVIL. Praise for The Google Story “[The authors] do a fine job of recounting Google’s rapid rise and explaining its search business.”—The New York Times “An intriguing insider view of the Google culture.”—Harvard Business Review “An interesting read on a powerhouse company . . . If you haven’t read anything about one of today’s most influential companies, you should. If you don’t read The Google Story, you’re missing a few extra treats.”—USA Today “Fascinating . . . meticulous . . . never bogs down.”—Houston Chronicle',
          industryIdentifiers: [
            {
              type: 'ISBN_13',
              identifier: '9780440335702',
            },
            {
              type: 'ISBN_10',
              identifier: '0440335701',
            },
          ],
          readingModes: {
            text: true,
            image: false,
          },
          pageCount: 384,
          printType: 'BOOK',
          categories: ['Business & Economics'],
          averageRating: 3.5,
          ratingsCount: 21,
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: true,
          contentVersion: '2.3.2.0.preview.2',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&dq=zyTCAlFPjgYC&hl=&cd=1&source=gbs_api',
          infoLink:
            'https://play.google.com/store/books/details?id=zyTCAlFPjgYC&source=gbs_api',
          canonicalVolumeLink:
            'https://play.google.com/store/books/details?id=zyTCAlFPjgYC',
        },
        saleInfo: {
          country: 'US',
          saleability: 'FOR_SALE',
          isEbook: true,
          listPrice: {
            amount: 13.99,
            currencyCode: 'USD',
          },
          retailPrice: {
            amount: 13.99,
            currencyCode: 'USD',
          },
          buyLink:
            'https://play.google.com/store/books/details?id=zyTCAlFPjgYC&rdid=book-zyTCAlFPjgYC&rdot=1&source=gbs_api',
          offers: [
            {
              finskyOfferType: 1,
              listPrice: {
                amountInMicros: 13990000,
                currencyCode: 'USD',
              },
              retailPrice: {
                amountInMicros: 13990000,
                currencyCode: 'USD',
              },
              giftable: true,
            },
          ],
        },
        accessInfo: {
          country: 'US',
          viewability: 'PARTIAL',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: true,
            acsTokenLink:
              'http://books.google.com/books/download/The_Google_Story_2018_Updated_Edition-sample-epub.acsm?id=zyTCAlFPjgYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
          },
          pdf: {
            isAvailable: false,
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=zyTCAlFPjgYC&hl=&printsec=frontcover&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            'If you don’t read The Google Story, you’re missing a few extra treats.”—USA Today “Fascinating . . . meticulous . . . never bogs down.”—Houston Chronicle',
        },
      },
      {
        kind: 'books#volume',
        id: 'VqZCDwAAQBAJ',
        etag: 'nVyEE7m7r4Y',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/VqZCDwAAQBAJ',
        volumeInfo: {
          title: 'Statistiskt sett',
          subtitle: 'bygga en världsbild på fakta',
          authors: ['Per Broberg'],
          publisher: 'Per Broberg',
          description:
            'Statistiken har förändrat vår värld, inte primärt genom nya upptäckter, utan genom att förändra vårt sätt att resonera, tänka ut experiment och bilda oss en uppfattning. Denna bok förklarar för en bred publik hur statistik påverkar våra liv. Den puffar för en vetenskaplig attityd, som söker klarhet genom fakta. Mängder av exempel på tillämpningar av betydelse för mänskligheten ger insikter i både statistiken och dess tillämpningar. Centrala begrepp introduceras genom enkla exempel från verkligheten och med en god portion humor. Boken beskriver tillämpningar inom medicin, biologi, fysik, teknik, samhällsvetenskap och humaniora. Genom Hans Rosling lärde vi oss att se globala frågor i ljuset av statistik. Författaren menar att vi alla kan följa i hans fotspår.',
          industryIdentifiers: [
            {
              type: 'ISBN_13',
              identifier: '9789177394723',
            },
            {
              type: 'ISBN_10',
              identifier: '9177394720',
            },
          ],
          readingModes: {
            text: true,
            image: true,
          },
          printType: 'BOOK',
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '1.1.2.0.preview.3',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=VqZCDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=VqZCDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'sv',
          previewLink:
            'http://books.google.com/books?id=VqZCDwAAQBAJ&pg=PT199&dq=zyTCAlFPjgYC&hl=&cd=2&source=gbs_api',
          infoLink:
            'http://books.google.com/books?id=VqZCDwAAQBAJ&dq=zyTCAlFPjgYC&hl=&source=gbs_api',
          canonicalVolumeLink:
            'https://books.google.com/books/about/Statistiskt_sett.html?hl=&id=VqZCDwAAQBAJ',
        },
        saleInfo: {
          country: 'US',
          saleability: 'NOT_FOR_SALE',
          isEbook: false,
        },
        accessInfo: {
          country: 'US',
          viewability: 'PARTIAL',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: true,
            acsTokenLink:
              'http://books.google.com/books/download/Statistiskt_sett-sample-epub.acsm?id=VqZCDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
          },
          pdf: {
            isAvailable: true,
            acsTokenLink:
              'http://books.google.com/books/download/Statistiskt_sett-sample-pdf.acsm?id=VqZCDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=VqZCDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            '[34] D.A. Vise och M. Malseed. The Google Story: For Google&#39;s 10th Birthday. Random House Publishing Group, 2005. ISBN: 9780440335702. URL: https://books.google.se/books?id=<b>zyTCAlFPjgYC</b>. [35] Sergey Brin och Lawrence Page.',
        },
      },
      {
        kind: 'books#volume',
        id: 'gK98gXR8onwC',
        etag: '+V6PxcfJlGo',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/gK98gXR8onwC',
        volumeInfo: {
          title: 'Flowers for Algernon',
          subtitle: 'A One-act Play',
          authors: ['David Rogers', 'Daniel Keyes'],
          publisher: 'Dramatic Publishing',
          publishedDate: '1969',
          industryIdentifiers: [
            {
              type: 'ISBN_10',
              identifier: '0871293870',
            },
            {
              type: 'ISBN_13',
              identifier: '9780871293879',
            },
          ],
          readingModes: {
            text: false,
            image: true,
          },
          pageCount: 32,
          printType: 'BOOK',
          categories: ['American drama'],
          averageRating: 5,
          ratingsCount: 1,
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '0.1.2.0.preview.1',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=gK98gXR8onwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=gK98gXR8onwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=gK98gXR8onwC&printsec=frontcover&dq=zyTCAlFPjgYC&hl=&cd=3&source=gbs_api',
          infoLink:
            'http://books.google.com/books?id=gK98gXR8onwC&dq=zyTCAlFPjgYC&hl=&source=gbs_api',
          canonicalVolumeLink:
            'https://books.google.com/books/about/Flowers_for_Algernon.html?hl=&id=gK98gXR8onwC',
        },
        saleInfo: {
          country: 'US',
          saleability: 'NOT_FOR_SALE',
          isEbook: false,
        },
        accessInfo: {
          country: 'US',
          viewability: 'PARTIAL',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
          },
          pdf: {
            isAvailable: false,
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=gK98gXR8onwC&hl=&printsec=frontcover&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
      },
      {
        kind: 'books#volume',
        id: 'ymRYTqoOkrYC',
        etag: 'aH0ORXYtwys',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/ymRYTqoOkrYC',
        volumeInfo: {
          title: 'Multinational Finance',
          subtitle: 'Evaluating Opportunities, Costs, and Risks of Operations',
          authors: ['Kirt C. Butler'],
          publisher: 'John Wiley & Sons',
          publishedDate: '2012-08-28',
          description:
            "An in-depth treatment of the international financial arena Multinational Finance, Fifth Edition assumes the viewpoint of the financial manager of a multinational corporation with investment or financial operations in more than one country. This book provides a framework for evaluating the many opportunities, costs, and risks of multinational operations in a manner that allows readers to see beyond the math and terminology surrounding this field to realize the general principles of multinational financial management. Logically organized and written in a clear, non-technical style, this book includes information on international finance topics such as foreign exchange, currency and derivatives markets, currency risk (transaction, operating, and translation) management, country risk, international taxation, capital structure, cost of capital, and international portfolio diversification. It also offers unique chapters on multinational treasury management, the rationale for hedging currency risks, options on real assets, international corporate governance, asset pricing, and portfolio management. Emphasizes the managerial aspects of multinational finance with graphs, figures, and the use of numerous real-world examples Expands on the treatment of parity disequilibria to include exchange rate expectations that differ from parity and a project's operating exposure to currency risk Provides an overview and comparison of the various derivative instruments and their use in risk hedging Contains valuable insights on valuation and management of a multinational corporation's investments If you're looking for the best way to gain a firm understanding of multinational finance, look no further than the fifth edition of this classic text.",
          industryIdentifiers: [
            {
              type: 'ISBN_13',
              identifier: '9781118282762',
            },
            {
              type: 'ISBN_10',
              identifier: '1118282760',
            },
          ],
          readingModes: {
            text: true,
            image: true,
          },
          pageCount: 704,
          printType: 'BOOK',
          categories: ['Business & Economics'],
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: true,
          contentVersion: '1.4.4.0.preview.3',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=ymRYTqoOkrYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=ymRYTqoOkrYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=ymRYTqoOkrYC&printsec=frontcover&dq=zyTCAlFPjgYC&hl=&cd=4&source=gbs_api',
          infoLink:
            'http://books.google.com/books?id=ymRYTqoOkrYC&dq=zyTCAlFPjgYC&hl=&source=gbs_api',
          canonicalVolumeLink:
            'https://books.google.com/books/about/Multinational_Finance.html?hl=&id=ymRYTqoOkrYC',
        },
        saleInfo: {
          country: 'US',
          saleability: 'NOT_FOR_SALE',
          isEbook: false,
        },
        accessInfo: {
          country: 'US',
          viewability: 'PARTIAL',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: true,
            acsTokenLink:
              'http://books.google.com/books/download/Multinational_Finance-sample-epub.acsm?id=ymRYTqoOkrYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
          },
          pdf: {
            isAvailable: true,
            acsTokenLink:
              'http://books.google.com/books/download/Multinational_Finance-sample-pdf.acsm?id=ymRYTqoOkrYC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=ymRYTqoOkrYC&hl=&printsec=frontcover&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            'This book provides a framework for evaluating the many opportunities, costs, and risks of multinational operations in a manner that allows readers to see beyond the math and terminology surrounding this field to realize the general ...',
        },
      },
      {
        kind: 'books#volume',
        id: 'OBM3AAAAIAAJ',
        etag: 'MMpIRnoG+IE',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/OBM3AAAAIAAJ',
        volumeInfo: {
          title: 'The Sign of Four',
          authors: ['Sir Arthur Conan Doyle'],
          publishedDate: '1890',
          industryIdentifiers: [
            {
              type: 'OTHER',
              identifier: 'UCAL:B3578478',
            },
          ],
          readingModes: {
            text: true,
            image: true,
          },
          pageCount: 283,
          printType: 'BOOK',
          averageRating: 4,
          ratingsCount: 68,
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '1.2.5.0.full.3',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=OBM3AAAAIAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=OBM3AAAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=OBM3AAAAIAAJ&printsec=frontcover&dq=zyTCAlFPjgYC&hl=&cd=5&source=gbs_api',
          infoLink:
            'https://play.google.com/store/books/details?id=OBM3AAAAIAAJ&source=gbs_api',
          canonicalVolumeLink:
            'https://play.google.com/store/books/details?id=OBM3AAAAIAAJ',
        },
        saleInfo: {
          country: 'US',
          saleability: 'FREE',
          isEbook: true,
          buyLink:
            'https://play.google.com/store/books/details?id=OBM3AAAAIAAJ&rdid=book-OBM3AAAAIAAJ&rdot=1&source=gbs_api',
        },
        accessInfo: {
          country: 'US',
          viewability: 'ALL_PAGES',
          embeddable: true,
          publicDomain: true,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: true,
            downloadLink:
              'http://books.google.com/books/download/The_Sign_of_Four.epub?id=OBM3AAAAIAAJ&hl=&output=epub&source=gbs_api',
          },
          pdf: {
            isAvailable: true,
            downloadLink:
              'http://books.google.com/books/download/The_Sign_of_Four.pdf?id=OBM3AAAAIAAJ&hl=&output=pdf&sig=ACfU3U2r922MdG8CcBKiqlNicd3VVgbQfQ&source=gbs_api',
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=OBM3AAAAIAAJ&hl=&printsec=frontcover&source=gbs_api',
          accessViewStatus: 'FULL_PUBLIC_DOMAIN',
          quoteSharingAllowed: false,
        },
      },
      {
        kind: 'books#volume',
        id: 'XshPAgAACAAJ',
        etag: 'iJvap2yItF8',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/XshPAgAACAAJ',
        volumeInfo: {
          title: 'Flowers for Algernon',
          authors: ['Daniel Keyes'],
          publisher: 'Creative Company',
          publishedDate: '1988',
          description:
            'Mentally retarded Charlie Gordon participates in an experiment which turns him into a genius but only temporarily.',
          industryIdentifiers: [
            {
              type: 'ISBN_10',
              identifier: '0886820073',
            },
            {
              type: 'ISBN_13',
              identifier: '9780886820077',
            },
          ],
          readingModes: {
            text: false,
            image: false,
          },
          pageCount: 60,
          printType: 'BOOK',
          categories: ['Fiction'],
          averageRating: 5,
          ratingsCount: 1,
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: 'preview-1.0.0',
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=XshPAgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=XshPAgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=XshPAgAACAAJ&dq=zyTCAlFPjgYC&hl=&cd=6&source=gbs_api',
          infoLink:
            'http://books.google.com/books?id=XshPAgAACAAJ&dq=zyTCAlFPjgYC&hl=&source=gbs_api',
          canonicalVolumeLink:
            'https://books.google.com/books/about/Flowers_for_Algernon.html?hl=&id=XshPAgAACAAJ',
        },
        saleInfo: {
          country: 'US',
          saleability: 'NOT_FOR_SALE',
          isEbook: false,
        },
        accessInfo: {
          country: 'US',
          viewability: 'NO_PAGES',
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
          },
          pdf: {
            isAvailable: false,
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=XshPAgAACAAJ&hl=&printsec=frontcover&source=gbs_api',
          accessViewStatus: 'NONE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            'Mentally retarded Charlie Gordon participates in an experiment which turns him into a genius but only temporarily.',
        },
      },
      {
        kind: 'books#volume',
        id: 'D9U3DwAAQBAJ',
        etag: '8Wt5g73ANvk',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/D9U3DwAAQBAJ',
        volumeInfo: {
          title: 'Flowers',
          authors: ['Vijaya Khisty Bodach'],
          publisher: 'Raintree',
          publishedDate: '2018-03-08',
          description:
            'Text and photographs introduce the flowers found on plants, and includes information on how they grow, along with their uses.',
          industryIdentifiers: [
            {
              type: 'ISBN_13',
              identifier: '9781474735544',
            },
            {
              type: 'ISBN_10',
              identifier: '1474735541',
            },
          ],
          readingModes: {
            text: false,
            image: false,
          },
          pageCount: 24,
          printType: 'BOOK',
          categories: ['Flowers'],
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: 'preview-1.0.0',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=D9U3DwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=D9U3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.com/books?id=D9U3DwAAQBAJ&dq=zyTCAlFPjgYC&hl=&cd=7&source=gbs_api',
          infoLink:
            'http://books.google.com/books?id=D9U3DwAAQBAJ&dq=zyTCAlFPjgYC&hl=&source=gbs_api',
          canonicalVolumeLink:
            'https://books.google.com/books/about/Flowers.html?hl=&id=D9U3DwAAQBAJ',
        },
        saleInfo: {
          country: 'US',
          saleability: 'NOT_FOR_SALE',
          isEbook: false,
        },
        accessInfo: {
          country: 'US',
          viewability: 'NO_PAGES',
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
          },
          pdf: {
            isAvailable: false,
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=D9U3DwAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
          accessViewStatus: 'NONE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            'Text and photographs introduce the flowers found on plants, and includes information on how they grow, along with their uses.',
        },
      },
    ],
  };
  // console.log(resData);
  // console.log(typeof resData);

  resData = resData.items[0];
  console.log(resData);

  const bookData = {
    external_book_id: resData.volumeInfo.id,
    book_title: resData.volumeInfo.title,
    book_author: resData.volumeInfo.authors,
    book_description: resData.volumeInfo.description,
    book_genre: resData.volumeInfo.categories,
  };

  Book.addBook(bookData);

  return bookData;
}

module.exports = { getBookDetails, bookSearch };
