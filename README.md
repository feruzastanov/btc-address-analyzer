# Bitcoin Address Analyzer

A modern web application for analyzing relationships between Bitcoin addresses and tracking BTC price movements. Built with React, TypeScript, and Tailwind CSS.

![Bitcoin Address Analyzer](https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

- **Address Relationship Analysis**
  - Compare two Bitcoin addresses
  - View shared transaction history
  - Analyze total exchanged value
  - Track confirmation status

- **Real-time BTC Price Tracking**
  - Live price updates
  - 7-day price history chart
  - BTC to USD calculator

- **Comprehensive Transaction Data**
  - Transaction hash lookup
  - Confirmation status
  - Amount tracking
  - Timestamp information

- **Modern UI/UX**
  - Responsive design
  - Dark/Light mode support
  - Interactive charts
  - Real-time updates

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Chart.js
- Vite
- BlockCypher API
- Binance API

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bitcoin-address-analyzer.git
cd bitcoin-address-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Enter two Bitcoin addresses in the input fields
2. Click "Analyze" to view their relationship
3. Explore transaction history and metrics
4. Use the BTC calculator for quick conversions
5. Toggle between dark and light modes

## API Integration

The application uses two main APIs:

- **BlockCypher API**: For Bitcoin address and transaction data
- **Binance API**: For real-time BTC price data and historical charts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [BlockCypher](https://www.blockcypher.com/) for the Bitcoin blockchain API
- [Binance](https://www.binance.com/) for the cryptocurrency price API
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Chart.js](https://www.chartjs.org/) for the price charts
- [Lucide Icons](https://lucide.dev/) for the beautiful icons

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/bitcoin-address-analyzer](https://github.com/yourusername/bitcoin-address-analyzer)