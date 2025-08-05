# PropertyManager - Modern Property Management Platform

A comprehensive property management application built with Next.js 15, TypeScript, and Tailwind CSS. This platform helps property managers efficiently manage properties, tenants, and maintenance requests with real-time data integration.

## Features

### 🏢 Property Management
- Add, edit, and delete properties
- Track occupancy rates and revenue
- Property details with amenities and images
- Location-based services with Google Maps integration

### 👥 Tenant Management
- Comprehensive tenant profiles
- Lease tracking and payment status
- Emergency contact information
- Search and filter capabilities

### 🔧 Maintenance Tracking
- Create and manage maintenance requests
- Priority-based categorization
- Vendor assignment and cost tracking
- Status updates and completion tracking

### 📊 Analytics & Reporting
- Real-time dashboard with key metrics
- Occupancy rate monitoring
- Revenue tracking and forecasting
- Maintenance request analytics

### 🔌 API Integrations
- **ATTOM Data API**: Property valuations and market data
- **Google Maps API**: Geocoding and location services
- **RentSpree API**: Rental market insights
- RESTful API architecture for all operations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Icons**: Lucide React
- **API**: Next.js API routes with TypeScript
- **State Management**: React hooks and context
- **Form Handling**: Native React forms with validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys for external services (optional for demo)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd property-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   NEXT_PUBLIC_ATTOM_API_KEY=your_attom_api_key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_RENTSPREE_API_KEY=your_rentspree_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Integration Setup

### ATTOM Data API
1. Sign up at [ATTOM Data](https://api.developer.attomdata.com/)
2. Get your API key from the developer portal
3. Add to `.env.local` as `NEXT_PUBLIC_ATTOM_API_KEY`

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Geocoding API and Maps JavaScript API
3. Create an API key with appropriate restrictions
4. Add to `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### RentSpree API
1. Contact [RentSpree](https://www.rentspree.com/api) for API access
2. Get your API credentials
3. Add to `.env.local` as `NEXT_PUBLIC_RENTSPREE_API_KEY`

## Project Structure

```
src/
├── app/                    # Next.js 15 app directory
│   ├── api/               # API routes
│   │   ├── properties/    # Property CRUD operations
│   │   ├── tenants/       # Tenant management
│   │   └── maintenance/   # Maintenance requests
│   ├── dashboard/         # Dashboard page
│   ├── properties/        # Properties page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── landing-page.tsx  # Landing page component
│   ├── enhanced-property-dashboard.tsx
│   ├── property-forms.tsx # Form components
│   └── navigation.tsx    # Navigation component
├── lib/                  # Utility libraries
│   └── api.ts           # API integration layer
└── styles/              # Global styles
```

## API Endpoints

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create new property
- `GET /api/properties/[id]` - Get property by ID
- `PUT /api/properties/[id]` - Update property
- `DELETE /api/properties/[id]` - Delete property

### Tenants
- `GET /api/tenants` - Get all tenants
- `POST /api/tenants` - Create new tenant
- `GET /api/tenants/[id]` - Get tenant by ID
- `PUT /api/tenants/[id]` - Update tenant
- `DELETE /api/tenants/[id]` - Delete tenant

### Maintenance
- `GET /api/maintenance` - Get all maintenance requests
- `POST /api/maintenance` - Create new request
- `GET /api/maintenance/[id]` - Get request by ID
- `PUT /api/maintenance/[id]` - Update request
- `DELETE /api/maintenance/[id]` - Delete request

## Features in Detail

### Dashboard Overview
- Real-time statistics and metrics
- Property portfolio overview
- Tenant payment status
- Maintenance request tracking
- Quick action buttons

### Property Management
- Comprehensive property profiles
- Occupancy rate tracking
- Revenue monitoring
- Amenity management
- Location integration

### Tenant Portal
- Tenant information management
- Lease agreement tracking
- Payment status monitoring
- Emergency contact details
- Communication history

### Maintenance System
- Request categorization (plumbing, electrical, HVAC, etc.)
- Priority levels (low, medium, high, urgent)
- Vendor assignment
- Cost estimation and tracking
- Status updates and completion

## Customization

### Adding New Property Types
Edit `src/lib/api.ts` and update the Property interface:
```typescript
type: 'apartment' | 'house' | 'condo' | 'commercial' | 'your-new-type'
```

### Custom Maintenance Categories
Update the MaintenanceRequest interface in `src/lib/api.ts`:
```typescript
category: 'plumbing' | 'electrical' | 'hvac' | 'your-category'
```

### Styling Customization
The project uses Tailwind CSS. Customize colors, fonts, and spacing in `tailwind.config.js`.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the API integration guides

## Roadmap

- [ ] User authentication and authorization
- [ ] Email notifications for maintenance requests
- [ ] Document management system
- [ ] Financial reporting and analytics
- [ ] Mobile app development
- [ ] Integration with accounting software
- [ ] Automated rent collection
- [ ] Tenant portal with self-service features

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.