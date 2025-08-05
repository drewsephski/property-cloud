"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Building2,
    Users,
    DollarSign,
    Wrench,
    Shield,
    BarChart3,
    Clock,
    CheckCircle,
    ArrowRight,
    Star
} from "lucide-react"

interface LandingPageProps {
    onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
    const features = [
        {
            icon: Building2,
            title: "Property Management",
            description: "Manage multiple properties with ease. Track occupancy, revenue, and property details in one place."
        },
        {
            icon: Users,
            title: "Tenant Management",
            description: "Keep track of tenant information, lease agreements, and payment history with our comprehensive tenant portal."
        },
        {
            icon: Wrench,
            title: "Maintenance Tracking",
            description: "Streamline maintenance requests, track work orders, and manage vendor relationships efficiently."
        },
        {
            icon: DollarSign,
            title: "Financial Analytics",
            description: "Monitor cash flow, generate reports, and track expenses with powerful financial tools."
        },
        {
            icon: BarChart3,
            title: "Advanced Analytics",
            description: "Get insights into your portfolio performance with detailed analytics and reporting."
        },
        {
            icon: Shield,
            title: "Secure & Reliable",
            description: "Your data is protected with enterprise-grade security and regular backups."
        }
    ]

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Property Manager",
            company: "Urban Properties LLC",
            content: "PropertyManager has transformed how we handle our portfolio. The maintenance tracking alone has saved us countless hours.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Real Estate Investor",
            company: "Chen Holdings",
            content: "The financial analytics give me the insights I need to make informed investment decisions. Highly recommended!",
            rating: 5
        },
        {
            name: "Lisa Rodriguez",
            role: "Property Owner",
            company: "Rodriguez Rentals",
            content: "Finally, a property management system that's both powerful and easy to use. My tenants love the portal too.",
            rating: 5
        }
    ]

    const stats = [
        { label: "Properties Managed", value: "10,000+" },
        { label: "Happy Tenants", value: "50,000+" },
        { label: "Maintenance Requests", value: "100,000+" },
        { label: "Customer Satisfaction", value: "99%" }
    ]

    return (
        <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-y-auto">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Building2 className="h-8 w-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-900">PropertyManager</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost">Features</Button>
                            <Button variant="ghost">Pricing</Button>
                            <Button variant="ghost">Contact</Button>
                            <Button onClick={onGetStarted}>Get Started</Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-12 px-6 mt-12">
                <div className="container mx-auto text-center">
                    <div className="max-w-4xl mx-auto mt-12">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            Streamline Your Property Management with
                            <span className="text-blue-600 font-black"> Modern Tools</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Manage properties, tenants, and maintenance requests with our comprehensive platform.
                            Built for property managers who demand efficiency and reliability.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-3">
                                Start Free Trial
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                                Watch Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-18 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 px-6 mt-12">
                <div className="container mx-auto">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                            Everything You Need to Manage Properties
                        </h3>
                        <p className="text-base text-gray-600 max-w-4xl mx-auto">
                            Our comprehensive suite of tools helps you manage every aspect of your property portfolio efficiently.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-12 bg-gray-50 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                Why Choose PropertyManager?
                            </h3>
                            <div className="space-y-4">
                                {[
                                    "Reduce administrative overhead by 60%",
                                    "Improve tenant satisfaction with faster response times",
                                    "Increase revenue with better occupancy tracking",
                                    "Streamline maintenance with automated workflows",
                                    "Access real-time analytics and reporting",
                                    "Scale your business with confidence"
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="text-center mb-6">
                                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <h4 className="text-xl font-semibold text-gray-900">Save Time Every Day</h4>
                                <p className="text-gray-600 mt-2">
                                    Automate routine tasks and focus on growing your business
                                </p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Manual processes</span>
                                    <span className="font-semibold text-red-600">8 hours/day</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">With PropertyManager</span>
                                    <span className="font-semibold text-green-600">2 hours/day</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Time Saved</span>
                                        <span className="font-bold text-blue-600">6 hours/day</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Trusted by Property Managers Worldwide
                        </h3>
                        <p className="text-lg text-gray-600">
                            See what our customers have to say about PropertyManager
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-4 italic">&quot;{testimonial.content}&quot;</p>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                        <div className="text-sm text-blue-600">{testimonial.company}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-blue-600 px-6">
                <div className="container mx-auto text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Ready to Transform Your Property Management?
                    </h3>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of property managers who have streamlined their operations with PropertyManager.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" onClick={onGetStarted} className="text-lg px-8 py-3">
                            Start Your Free Trial
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-black border-white hover:bg-white hover:text-blue-600">
                            Schedule Demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <Building2 className="h-6 w-6 text-blue-400" />
                                <span className="text-lg font-semibold">PropertyManager</span>
                            </div>
                            <p className="text-gray-400">
                                The modern solution for property management professionals.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Features</li>
                                <li>Pricing</li>
                                <li>Integrations</li>
                                <li>API</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>About</li>
                                <li>Blog</li>
                                <li>Careers</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Help Center</li>
                                <li>Documentation</li>
                                <li>Community</li>
                                <li>Status</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 PropertyManager. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}