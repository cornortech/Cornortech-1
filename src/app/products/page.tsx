// app/products/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CTA from '@/components/ui/CTA';

// ==== Product Data ====

export type Feature = {
  title: string;
  desc: string;
  image?: string;
};

export type PricingTier = {
  name: string;            // "Demo", "Free", "Premium"
  tag?: string;            // small badge e.g. "Most Popular", "Best Value"
  price: string;           // "Free", "NPR 11,111"
  excludesVat?: boolean;
  originalPrice?: string;  // "NPR 20,000" -> shown struck-through
  period?: string;         // "/ 7-day trial", "/ month", "one-time"
  description: string;
  features: string[];
  cta: string;             // button label
  highlighted?: boolean;   // visually emphasize this card
};

type Product = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  longDesc: string;
  logo: string;
  image: string;
  features: Feature[];
  highlights: string[];
  category: string;
  loginUrl: string;
  pending?: string;
  pricing: PricingTier[];
};

const PRODUCTS: Product[] = [
  {
    id: 'atithi-rms',
    name: 'Atithi RMS',
    tagline: 'Restaurant Management, Simplified',
    category: 'Hospitality Software',
    desc: 'A complete restaurant management system built to handle orders, tables, kitchen workflow, and billing — all from one clean dashboard.',
    longDesc: `Atithi RMS is designed for restaurants, cafes, and hotels that want to move away from paper-based order taking and disconnected billing systems. From the moment an order is placed at the table to when the kitchen prepares it and the final bill is generated, Atithi RMS keeps every step connected and visible in real time.

At the center of the system is a live dashboard that gives managers an instant snapshot of the business through clear, straightforward numbers — today's revenue and today's total sales, alongside lifetime totals for revenue and orders. So if you've been using the system for 3 days, the dashboard reflects the combined revenue and orders across all 3 days, not just today, giving owners a clear picture of overall performance at any moment. A dedicated Total Sales view breaks this down further, showing daily sales figures with the option to print a daily sales report for accounting or record-keeping.

On the floor, Table Management gives staff a visual layout of every table, color-coded as Available, Occupied, Reserved, or Out of Service, with statuses updating instantly as guests are seated or leave. Orders are built through Create Order by browsing the menu and adding items in a few taps, and every order — whether being prepared, ready, or served — is visible in real time through Order Tracking. The moment an order is placed, it appears on the Kitchen Display, so the chef always knows what to prepare next, and can mark dishes as ready the instant they're done cooking, keeping the kitchen and the floor perfectly in sync.

Billing is just as streamlined. Staff can generate itemized bills instantly through Create Bill, or save a bill as Pending if payment isn't settled right away — so nothing gets lost or forgotten while a customer steps out or a group decides how to split the cost. Every bill generated is stored permanently in Billing & VAT Audit, giving owners a complete, searchable record for accounting and VAT purposes. Behind the scenes, Stock Management lets the team track ingredient and supply levels for the restaurant or cafe, helping avoid running out of popular items mid-shift, while Menu Management makes it easy to add, update, or remove dishes as the menu evolves.

Atithi RMS also supports full staff role management. Only the manager can access Staff Management to create accounts for waiters, kitchen staff, and cashiers, and each role is limited to only the pages relevant to their job — keeping operations secure and every team member focused on their own responsibilities. A Settings page rounds out the system, letting owners manage restaurant details, update login credentials, and adjust other preferences whenever needed.

Whether you're running a single outlet or managing multiple branches, Atithi RMS scales with your business, giving owners the tools to reduce order errors, speed up table turnover, and understand exactly where their revenue is coming from.`,
    logo: '/products/athiti.png',
    image: '/products/atithi-rms.png',
    loginUrl: 'https://atithi.cornortech.com',
    features: [
      { title: 'Dashboard', desc: "View today's revenue, today's total sales, and lifetime totals for revenue and orders.", image: '/products/atithi/dashboard.png' },
      { title: 'Total Sales', desc: 'View daily sales summaries and print daily sales reports at any time.', image: '/products/atithi/total-sales.png' },
      { title: 'Pending Bills', desc: 'Save any bill as pending and come back to complete it later without losing order details.', image: '/products/atithi/pending-bills.png' },
      { title: 'Create Bill', desc: 'Generate accurate, itemized bills quickly for any table or order.', image: '/products/atithi/create-bill.png' },
      { title: 'Kitchen Display (KOT)', desc: 'New orders appear instantly for the chef to prepare, and can be marked ready once cooking is complete.', image: '/products/atithi/kot.png' },
      { title: 'Table Management', desc: 'Track every table as Available, Occupied, Reserved, or Out of Service.', image: '/products/atithi/tables.png' },
      { title: 'Create Order', desc: 'Browse the menu and create a new order in just a few taps.', image: '/products/atithi/create-order.png' },
      { title: 'Order Tracking', desc: 'See every order at a glance, whether it is being prepared, ready, or already served.', image: '/products/atithi/order-tracking.png' },
      { title: 'Menu Management', desc: 'Add, update, delete, and view menu items with full control over pricing.', image: '/products/atithi/menu-management.png' },
      { title: 'Stock Management', desc: 'Record and track stock levels for your restaurant or cafe ingredients.', image: '/products/atithi/stock-management.png' },
      { title: 'Billing & VAT Audit', desc: 'View a complete record of every bill generated, ready for accounting.', image: '/products/atithi/vat-audit.png' },
      { title: 'Staff Management', desc: 'Managers can create accounts for waiters, kitchen staff, and cashiers.', image: '/products/atithi/staff.png' },
      { title: 'Settings', desc: 'Manage restaurant details, update your ID and password, and configure preferences.', image: '/products/atithi/settings.png' },
    ],
    highlights: ['Order & KOT Management', 'Table Management', 'Menu Management', 'Kitchen Display System', 'Order Tracking', 'Billing & VAT', 'Staff Roles', 'Stock Tracking'],
    pricing: [
      {
        name: 'Demo',
        tag: '30-Day Trial',
        price: 'Free',
        excludesVat: false,
        period: '30-day trial',
        description: 'Full access to every feature so you can test it on the floor before you commit.',
        features: [
          'All features unlocked',
          'Live Business Dashboard',
          'Total Sales & Revenue Analytics',
          'Pending Bills & Order Hold Management',
          'Instant Bill Generation',
          'Kitchen Display System (KOT)',
          'Visual Table Management',
          'Fast Order Creation',
          'Real-Time Order Tracking',
          'Dynamic Menu Management',
          'Stock & Inventory Tracking',
          'Billing & VAT Audit Logs',
          'Role-Based Staff Management',
          'System & Outlet Settings',
          'Unlimited Test Orders',
        ],
        cta: 'Start Free Demo',
      },
      {
        name: 'Premium',
        tag: 'Top Choice',
        price: 'NPR 11,111',
        excludesVat: true,
        originalPrice: 'NPR 20,000',
        period: '/ year',
        description: 'Everything a growing restaurant or multi-branch outlet needs to run at full speed.',
        features: [
          'Unlimited staff accounts',
          'Live Business Dashboard',
          'Total Sales & Revenue Analytics',
          'Pending Bills & Order Hold Management',
          'Instant Bill Generation',
          'Kitchen Display System (KOT)',
          'Visual Table Management',
          'Fast Order Creation',
          'Real-Time Order Tracking',
          'Dynamic Menu Management',
          'Stock & Inventory Tracking',
          'Billing & VAT Audit Logs',
          'Role-Based Staff Management',
          'System & Outlet Settings',
          'Unlimited Test Orders',
          'Priority support',
        ],
        cta: 'Upgrade to Premium',
        highlighted: true,
      },
      {
        name: 'Enterprise',
        tag: 'Multi-Branch & Chains',
        price: 'Custom',
        excludesVat: true,
        originalPrice: 'Tailored Quote',
        period: '/ custom billing',
        description: 'Custom solutions for large restaurant chains, franchises, and multi-location hospitality brands requiring dedicated infrastructure and SLAs.',
        features: [
          'Everything in Premium, plus:',
          'Multi-Branch Central Management',
          'Franchise & Chain Operations Dashboard',
          'Centralized Menu & Price Push',
          'Central Warehouse & Stock Transfers',
          'Custom API & ERP/Accounting Integrations',
          'Custom Role & Granular Security Scopes',
          'Advanced Business Intelligence & Custom Reports',
          'Dedicated Account Manager',
          '24/7 Priority SLA & Phone Support',
          'On-site Staff Onboarding & Training',
          'Private Cloud or Custom Deployment',
        ],
        cta: 'Contact Enterprise Sales',
        highlighted: false,
      },
    ],
  },
  {
    id: 'artha-pos',
    name: 'Artha POS',
    tagline: 'Point of Sale, Reimagined',
    category: 'Retail Software',
    desc: 'An offline-capable point-of-sale system for retail stores, grocery shops, supermarkets, and beverage outlets — built for fast billing, accurate inventory, and clear business visibility.',
    longDesc: `Artha POS is a complete retail operating system, not just a checkout screen. It brings billing, inventory, staff, customers, and business visibility together in one place, so store owners always know what's selling, what's running low, and how the day is going.

At the counter, staff can bill customers using barcode scanners, camera-based barcode scanning, or by searching the product catalogue directly. Bills can be held to serve multiple customers at once, discounts can be applied with permission controls, and VAT is calculated automatically. Payments are accepted through cash, Fonepay, or split payments, with change calculated instantly and every payment detail printed on the receipt.

One of the biggest advantages of Artha POS is that it keeps working even when the internet doesn't. Core billing data is stored locally, so staff can continue serving customers during connectivity interruptions. Once the connection returns, transactions are automatically synchronized to the cloud, with duplicate prevention built in so no sale is ever counted twice.

Inventory is tracked in real time across products, categories, and variants such as size, flavour, colour, or type — each with its own price, barcode, and stock count. Stock adjustments for restocks, damages, returns, and corrections are all logged, low-stock alerts keep owners ahead of shortages, and product labels can be printed directly from the system.

Every staff member gets their own account with a four-digit terminal PIN, so administrators never need to share login credentials. Roles determine exactly what each person can do — from applying discounts and issuing refunds to updating inventory or viewing reports — and every sale or stock change is attributed to the staff member who made it.

Customer relationships are built in too. Staff can look up customers by phone number to see their purchase history, visit count, total spending, and loyalty points, making repeat service faster and more personal.

A live business dashboard rounds out the system, showing today's sales, transaction count, VAT collected, sales trends, category performance, low-stock alerts, recent transactions, and sync status — giving owners a clear, real-time read on the health of the business without digging through spreadsheets.

Whether it's a single small shop or a growing chain of retail outlets, Artha POS scales with the business, with support for multiple terminal modes, including a Juice Shop Mode built for fast, size-and-flavour-based beverage ordering.`,
    logo: '/products/artha pos.png',
    image: '/products/POS-Dashboard.jpg',
    loginUrl: 'https://artha.cornortech.com',
    features: [
      { title: 'Fast Billing', desc: 'Barcode and camera-based scanning, product search, quick quantity adjustments, held bills, and automatic VAT calculation.', image: '/products/artha/fast-billing.png' },
      { title: 'Offline-First Sales', desc: 'Keep billing during internet interruptions — transactions are queued locally and synced automatically.', image: '/products/artha/offline-billing.png' },
      { title: 'Inventory Control', desc: 'Manage products, categories, and variants with stock tracking and low-stock alerts.', image: '/products/artha/inventory.png' },
      { title: 'Staff & Permissions', desc: 'Individual staff accounts with PIN access and role-based permissions.', image: '/products/artha/staff.png' },
      { title: 'Customer Membership', desc: 'Phone-based customer lookup with purchase history, visit count, and loyalty points.', image: '/products/artha/customer.png' },
      { title: 'Payments', desc: 'Accept cash, Fonepay, and split payments with automatic change calculation.', image: '/products/artha/payments.png' },
      { title: 'Receipts & Labels', desc: '80mm thermal receipt printing with store details and VAT breakdown.', image: '/products/artha/receipts.png' },
      { title: 'Business Dashboard', desc: "Track today's sales, transaction count, VAT collected, and sales trends in real time.", image: '/products/artha/dashboard.png' },
    ],
    highlights: ['Offline Billing', 'Barcode Scanning', 'Inventory', 'Staff Permissions', 'Customer Loyalty', 'Live Dashboard'],
    pricing: [
      {
        name: 'Demo',
        tag: '30-Day Trial',
        price: 'Free',
        period: '30-day trial',
        description: 'Try the full POS on your counter, offline mode included, before you decide.',
        features: ['All features unlocked', 'Offline billing mode', 'Unlimited test transactions', 'Email support', 'No credit card required'],
        cta: 'Start Free Demo',
      },
      {
        name: 'Premium',
        tag: 'Best Value',
        price: 'NPR 11,111',
        originalPrice: 'NPR 20,000',
        period: '/ year',
        description: 'Full offline-first POS with inventory, staff, and customer loyalty built in.',
        features: ['Unlimited staff with PINs', 'Offline-first sync', 'Full inventory & variants', 'Customer loyalty & history', 'Priority support', 'Juice Shop Mode'],
        cta: 'Upgrade to Premium',
        highlighted: true,
      },
      {
  name: 'Enterprise',
  tag: 'Multi-Branch & Chains',
  price: 'Custom',
  excludesVat: true,
  originalPrice: 'Tailored Quote',
  period: '/ custom billing',
  description: 'Custom solutions for large retail chains, franchises, and multi-location stores requiring dedicated infrastructure and advanced multi-branch control.',
  features: [
    'Multi-branch central management',
    'Advanced cross-store inventory sync',
    'Dedicated cloud infrastructure & backup',
    'Custom role permissions & audit logs',
    'Dedicated account manager & 24/7 SLA support',
    'Custom API & hardware integrations'
  ],
  cta: 'Contact Enterprise Sales',
  highlighted: false,
},
    ],
  },
  {
    id: 'cornor-tech-ai',
    name: 'Cornor Tech AI',
    tagline: 'AI-based solutions & automation products and services.',
    category: 'Artificial Intelligence',
    desc: 'Cutting-edge AI-based solutions, intelligent automation products, and custom software services built to streamline workflows, enhance decision-making, and scale business operations.',
    longDesc: `Cornor Tech AI is a comprehensive artificial intelligence and automation partner, designed to move businesses beyond basic software and into intelligent operations. It brings automated workflows, machine learning models, intelligent assistants, and custom AI services together in one ecosystem, so organizations always know how their automated processes are performing, where efficiency can be gained, and how data is driving growth.

At the operational core, teams can deploy pre-built AI agents or custom automation pipelines to handle repetitive tasks, process documents, analyze unstructured data, and interact with customers around the clock. Workflows can be paused or reconfigured dynamically, security permissions control access to sensitive AI models, and processing metrics are tracked automatically. Integrations are handled smoothly through robust APIs, with every interaction logged and securely processed.

One of the biggest advantages of Cornor Tech AI is its resilience and adaptability. Core AI pipelines and caching layers are optimized for speed and high availability, ensuring systems continue operating even during fluctuating network or API loads. Once full connectivity or peak processing states return, tasks sync seamlessly with built-in redundancy prevention so no data point or customer request is ever processed twice.

Intelligence is tracked in real time across models, automation flows, and business categories — each with its own performance metrics, latency benchmarks, and success rates. Performance adjustments, fine-tuning checkpoints, error corrections, and custom prompt updates are thoroughly logged, while proactive alerts keep administrators ahead of any anomalies or model drift.

Every team member gets their own secure account with role-based access controls, so administrators never need to share master API keys or administrative credentials. Roles determine exactly what each person can do — from deploying new models and adjusting automation parameters to viewing analytics reports or managing billing — and every system change is attributed to the user who made it.

Client relationship and usage tracking are built right in. Administrators can look up client accounts by ID or email to view their usage history, active automation pipelines, resource consumption, and subscription status, making client management faster and more transparent.

A live AI operations dashboard rounds out the system, showing today's API requests, active automation counts, processing success rates, system latency trends, category performance, recent workflow executions, and system health status — giving leaders a clear, real-time view of their AI infrastructure without digging through raw logs.

Whether it's a single custom automation script for a growing startup or an enterprise-wide suite of AI solutions, Cornor Tech AI scales with the organization, supporting multi-environment deployments and tailored AI integration modes built for high-speed, intelligent business operations.`,
    logo: '/products/conor ai.png',
    image: '/products/Chat-Ai.webp',
    loginUrl: 'https://cornortech.com',
    features: [
      { title: 'Intelligent Automation', desc: 'Custom AI workflows, automated document processing, smart chatbots, and trigger-based task execution.', image: '/products/cornor-ai/automation.png' },
      { title: 'Reliable AI Infrastructure', desc: 'High-availability architecture with optimized caching and request queuing.', image: '/products/cornor-ai/infrastructure.png' },
      { title: 'Model & Workflow Control', desc: 'Manage AI models, fine-tuning checkpoints, and performance metrics.', image: '/products/cornor-ai/model-control.png' },
      { title: 'Team & Role Permissions', desc: 'Individual staff accounts with role-based access controls.', image: '/products/cornor-ai/permissions.png' },
      { title: 'Client & Usage Tracking', desc: 'Detailed client lookup with usage history and active pipelines.', image: '/products/cornor-ai/usage.png' },
      { title: 'API & Integrations', desc: 'Seamless integration capabilities with existing business software through secure APIs.', image: '/products/cornor-ai/api.png' },
      { title: 'Secure Logging & Receipts', desc: 'Comprehensive audit trails for every workflow execution and API call.', image: '/products/cornor-ai/logging.png' },
      { title: 'Operations Dashboard', desc: 'Track live API requests, automation counts, and success rates in real time.', image: '/products/cornor-ai/dashboard.png' },
    ],
    highlights: ['AI Automation', 'Custom Solutions', 'Workflow Pipelines', 'Role Permissions', 'Usage Analytics', 'Live Operations Dashboard'],
    pricing: [
   
    ],
  },
  {
    id: 'cornor-sms',
    name: 'Cornor SMS',
    tagline: 'SMS platform for bulk messaging, OTP and API integrations.',
    category: 'Communication & Messaging',
    desc: 'A reliable, scalable SMS platform built for businesses — offering high-volume bulk promotions, secure transactional OTPs, and robust RESTful API integrations.',
    longDesc: `Cornor SMS is a complete business messaging gateway, not just an ordinary text sender. It brings bulk outreach, instant OTP delivery, developer-friendly APIs, two-way messaging, and real-time delivery reporting together in one unified platform, ensuring organizations can connect with their customers instantly and reliably.

At the communication gateway, teams can broadcast promotional campaigns to large audiences, schedule automated reminders, or trigger time-sensitive alerts. Messages are personalized dynamically, delivery routing is optimized for maximum uptime, and every campaign's performance is tracked down to individual delivery statuses.

One of the biggest advantages of Cornor SMS is its low-latency infrastructure and high-volume capacity. Core queueing systems handle thousands of requests per second, ensuring transactional messages like security OTPs and account verifications arrive instantly without bottlenecks, while maintaining built-in duplicate prevention and smart carrier failovers.

Developer integration is frictionless via robust RESTful APIs. Developers can embed SMS triggers seamlessly into web apps, mobile platforms, and enterprise software with comprehensive documentation, clean endpoints, and secure API keys. Webhooks provide instant delivery receipts straight back to your application servers.

Every team member or client organization gets their own secure account dashboard with role-based access permissions. Administrators retain total control over sender IDs, credit balances, template approvals, and user privileges, ensuring strict compliance and security across all messaging channels.

Customer engagement goes beyond one-way broadcasts through two-way SMS capabilities, allowing businesses to receive customer replies, handle interactive messaging, and maintain continuous communication threads.

A live messaging analytics dashboard rounds out the platform, showing today's total sent messages, delivery success rates, credit consumption, campaign trends, and API health status — giving businesses clear, real-time transparency into their communication infrastructure.

Whether it's a startup sending verification codes or an enterprise running nationwide promotional campaigns, Cornor SMS scales effortlessly to meet high-volume communication demands with speed and reliability.`,
    logo: '/products/cornor ss.png',
    image: '/products/SMS.jpg',
    loginUrl: 'https://cornortech.com/sms-vendor',
    features: [
      { title: 'Bulk SMS Broadcasts', desc: 'Send high-volume messages to large audiences with fast delivery speeds.', image: '/products/cornor-sms/bulk.png' },
      { title: 'Transactional OTPs', desc: 'Automated OTPs, security alerts, and critical notifications with guaranteed delivery.', image: '/products/cornor-sms/otp.png' },
      { title: 'Powerful SMS APIs', desc: 'RESTful developer APIs for seamless integration of text messaging.', image: '/products/cornor-sms/api.png' },
      { title: 'Promotional Campaigns', desc: 'Targeted marketing campaigns featuring personalized messaging tags.', image: '/products/cornor-sms/campaigns.png' },
      { title: 'Two-Way Messaging', desc: 'Engage customers directly with interactive two-way conversations.', image: '/products/cornor-sms/two-way.png' },
      { title: 'Smart Scheduling', desc: 'Queue and schedule messages for automated future delivery.', image: '/products/cornor-sms/scheduling.png' },
      { title: 'Sender ID & Templates', desc: 'Manage custom branded Sender IDs and pre-approved message templates.', image: '/products/cornor-sms/templates.png' },
      { title: 'Live Analytics Dashboard', desc: 'Track daily message counts, delivery success metrics, and credit balances.', image: '/products/cornor-sms/dashboard.png' },
    ],
    highlights: ['Bulk SMS', 'Transactional OTP', 'API Integration', 'Two-Way SMS', 'Smart Scheduling', 'Live Analytics'],
    pricing: [
    
    ],
  },
  {
    id: 'arogya-cms',
    name: 'Arogya CMS',
    tagline: 'Clinic Management System.',
    category: 'Healthcare',
    desc: 'An offline-capable clinic management system for medical practices, healthcare centers, and outpatient clinics — built for fast patient billing, accurate medical inventory, and clear practice visibility.',
    longDesc: `Arogya CMSS is a complete healthcare operating system, not just a checkout screen. It brings patient registration, consultations, pharmacy billing, inventory, staff, and clinic visibility together in one place, so healthcare providers always know what medications are moving, what's running low, and how the day's collections are going.

At the front desk, staff can bill patients using barcode scanners for pharmacy items, camera-based barcode scanning, or by searching the medical service and product catalogue directly. Bills can be held to serve multiple patients at once, discounts can be applied with permission controls, and VAT is calculated automatically. Payments are accepted through cash, Fonepay, or split payments, with change calculated instantly and every payment detail printed on the receipt.

One of the biggest advantages of Arogya CMSS is that it keeps working even when the internet doesn't. Core billing and patient data are stored locally, so staff can continue serving patients during connectivity interruptions. Once the connection returns, transactions are automatically synchronized to the cloud, with duplicate prevention built in so no record is ever counted twice.

Inventory is tracked in real time across medicines, medical supplies, categories, and variants such as dosage, packaging, or brand — each with its own price, barcode, and stock count. Stock adjustments for restocks, damages, returns, and expiry corrections are all logged, low-stock alerts keep management ahead of shortages, and product or prescription labels can be printed directly from the system.

Every staff member gets their own account with a four-digit terminal PIN, so administrators never need to share login credentials. Roles determine exactly what each person can do — from applying discounts and issuing refunds to updating medical inventory or viewing financial reports — and every sale or stock change is attributed to the staff member who made it.

Patient relationships are built in too. Staff can look up patients by phone number to see their visit history, consultation records, total spending, and loyalty or membership details, making repeat healthcare service faster and more personal.

A live clinic dashboard rounds out the system, showing today's sales, transaction count, VAT collected, service trends, category performance, low-stock alerts, recent transactions, and sync status — giving clinic owners a clear, real-time read on the health of the practice without digging through spreadsheets.

Whether it's a single small clinic or a growing chain of healthcare outlets, Arogya CMSS scales with the medical practice, with support for multiple terminal modes built for fast, efficient patient flow and pharmacy dispensing.`,
    logo: '/products/aarogya.png',
    image: '/products/CMS.webp',
    loginUrl: 'https://artha.cornortech.com',
    pending: 'Coming Soon',
    features: [
      { title: 'Fast Patient Billing', desc: 'Barcode and camera-based scanning, medicine search, and automatic VAT calculation.', image: '/products/arogya/billing.png' },
      { title: 'Offline-First Sales', desc: 'Keep billing during internet interruptions — transactions are queued locally.', image: '/products/arogya/offline.png' },
      { title: 'Medical Inventory Control', desc: 'Manage medicines, supplies, and categories with stock tracking and expiry details.', image: '/products/arogya/inventory.png' },
      { title: 'Staff & Permissions', desc: 'Individual staff accounts with PIN access and role-based permissions.', image: '/products/arogya/staff.png' },
      { title: 'Patient Membership', desc: 'Phone-based patient lookup with visit history and consultation tracking.', image: '/products/arogya/patient.png' },
      { title: 'Payments', desc: 'Accept cash, Fonepay, and split payments with automatic change calculation.', image: '/products/arogya/payments.png' },
      { title: 'Receipts & Labels', desc: '80mm thermal receipt printing with clinic details and VAT breakdown.', image: '/products/arogya/receipts.png' },
      { title: 'Clinic Dashboard', desc: "Track today's sales, transaction count, VAT collected, and service trends in real time.", image: '/products/arogya/dashboard.png' },
    ],
    highlights: ['Offline Billing', 'Barcode Scanning', 'Medical Inventory', 'Staff Permissions', 'Patient History', 'Live Dashboard'],
    pricing: [
      {
        name: 'Demo',
        tag: '7-Day Trial',
        price: 'Free',
        period: '7-day trial',
        description: 'Try the full clinic workflow, from patient intake to pharmacy billing.',
        features: ['All features unlocked', 'Offline billing mode', 'Unlimited test patients', 'Email support', 'No credit card required'],
        cta: 'Notify Me',
      },
      {
        name: 'Premium',
        tag: 'Best Value',
        price: 'NPR 11,111',
        originalPrice: 'NPR 20,000',
        period: '/ year',
        description: 'Full clinic operating system with pharmacy inventory and patient history.',
        features: ['Unlimited staff with PINs', 'Offline-first sync', 'Medical inventory & expiry', 'Patient history & loyalty', 'Priority support', 'Multi-branch ready'],
        cta: 'Notify Me',
        highlighted: true,
      },
      {
  name: 'Enterprise',
  tag: 'Multi-Branch & Hospitals',
  price: 'Custom',
  excludesVat: true,
  originalPrice: 'Tailored Quote',
  period: '/ custom billing',
  description: 'Custom healthcare solutions for multi-location hospitals, diagnostic chains, and medical networks requiring enterprise-grade security and advanced coordination.',
  features: [
    'Multi-branch hospital & clinic central management',
    'Advanced cross-branch medical inventory & expiry sync',
    'Dedicated high-security cloud infrastructure',
    'Custom role permissions & audit logs for medical staff',
    'Dedicated account manager & 24/7 SLA support',
    'EHR/EMR integration & custom hardware support'
  ],
  cta: 'Contact Enterprise Sales',
  highlighted: false,
}
    ],
  },
];

// ==========================================
// SMALL ICONS (inline SVG, no extra dependency)
// ==========================================

type IconProps = { className?: string };

const ArrowRight = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const ChevronLeft = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronDown = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const CloseIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const CheckIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const BoltIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const LockIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const ChartIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const ScaleIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
const MailIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const SparkIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

// ==========================================
// FEATURE VISUALS — light-theme UI drawings that match each feature
// ==========================================

type VisualKind =
  | 'dashboard' | 'sales' | 'pending' | 'bill' | 'kitchen' | 'tables' | 'order' | 'tracking'
  | 'menu' | 'stock' | 'audit' | 'staff' | 'settings' | 'offline' | 'payments' | 'customer'
  | 'barcode' | 'automation' | 'infrastructure' | 'model' | 'api' | 'otp' | 'bulk' | 'chat'
  | 'schedule' | 'templates' | 'logging';

function getVisualKind(title: string): VisualKind {
  const t = title.toLowerCase();
  const has = (...keys: string[]) => keys.some((k) => t.includes(k));
  if (has('pending')) return 'pending';
  if (has('logging')) return 'logging';
  if (has('dashboard')) return 'dashboard';
  if (has('total sales', 'report')) return 'sales';
  if (has('kitchen', 'kot')) return 'kitchen';
  if (has('table management')) return 'tables';
  if (has('tracking') && !has('usage')) return 'tracking';
  if (has('create order')) return 'order';
  if (has('menu')) return 'menu';
  if (has('vat audit', 'audit')) return 'audit';
  if (has('stock', 'inventory')) return 'stock';
  if (has('offline')) return 'offline';
  if (has('fast billing', 'patient billing', 'barcode')) return 'barcode';
  if (has('create bill', 'receipt')) return 'bill';
  if (has('payment')) return 'payments';
  if (has('staff', 'permission', 'role')) return 'staff';
  if (has('setting')) return 'settings';
  if (has('membership', 'customer', 'patient', 'client', 'usage')) return 'customer';
  if (has('model')) return 'model';
  if (has('automation')) return 'automation';
  if (has('infrastructure', 'reliable')) return 'infrastructure';
  if (has('api', 'integration')) return 'api';
  if (has('otp', 'transactional')) return 'otp';
  if (has('two-way', 'conversation')) return 'chat';
  if (has('bulk', 'broadcast', 'campaign', 'promotional')) return 'bulk';
  if (has('schedul')) return 'schedule';
  if (has('template', 'sender')) return 'templates';
  return 'dashboard';
}

const DASH_STATS: Record<string, [string, string][]> = {
  'atithi-rms': [['Revenue', 'NPR 48.2k'], ['Orders', '126'], ['Tables', '18/24']],
  'artha-pos': [['Sales', 'NPR 92.4k'], ['Bills', '318'], ['VAT', 'NPR 10.6k']],
  'cornor-tech-ai': [['Requests', '24.8k'], ['Flows', '42'], ['Success', '99.2%']],
  'cornor-sms': [['Sent', '58.1k'], ['Delivered', '98.7%'], ['Credits', '1.2M']],
  'arogya-cms': [['Collected', 'NPR 36.9k'], ['Patients', '84'], ['Low stock', '6']],
};

function Frame({ title, children, wide = false }: { title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div
      className={`w-full ${wide ? 'max-w-[440px]' : 'max-w-[320px]'} overflow-hidden rounded-2xl bg-white shadow-[0_24px_48px_-16px_rgba(76,29,149,0.30)] ring-1 ring-slate-900/5`}
    >
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rose-300" />
        <span className="h-2 w-2 rounded-full bg-amber-300" />
        <span className="h-2 w-2 rounded-full bg-emerald-300" />
        <span className="ml-2 truncate text-[9px] font-bold text-slate-400">{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

const Pill = ({ children, tone }: { children: React.ReactNode; tone: string }) => (
  <span className={`rounded-md px-1.5 py-0.5 text-[8px] font-black ${tone}`}>{children}</span>
);

function FeatureVisual({ kind, title, productId, wide }: { kind: VisualKind; title: string; productId: string; wide?: boolean }) {
  switch (kind) {
    case 'dashboard': {
      const stats = DASH_STATS[productId] || DASH_STATS['atithi-rms'];
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-2.5 grid grid-cols-3 gap-1.5">
            {stats.map(([l, v]) => (
              <div key={l} className="rounded-lg bg-purple-50/80 p-1.5 ring-1 ring-purple-100">
                <p className="truncate text-[7px] font-bold uppercase text-slate-400">{l}</p>
                <p className="text-[11px] font-black text-slate-800">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex h-16 items-end gap-1 px-1">
            {[40, 65, 50, 80, 58, 92, 74].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-linear-to-t from-purple-600 to-violet-400"
                style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.5 }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between px-1 text-[7px] font-bold text-slate-400">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
        </Frame>
      );
    }

    case 'sales':
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[7px] font-bold uppercase text-slate-400">This week</p>
              <p className="text-sm font-black text-slate-800">NPR 3.2L</p>
            </div>
            <Pill tone="bg-emerald-50 text-emerald-600">+12.4%</Pill>
          </div>
          <svg viewBox="0 0 200 60" className="h-14 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="salesFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity=".35" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 45 L30 38 L60 42 L90 25 L120 30 L150 14 L200 8 L200 60 L0 60Z" fill="url(#salesFill)" />
            <path d="M0 45 L30 38 L60 42 L90 25 L120 30 L150 14 L200 8" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-2 space-y-1">
            {[['Sun', '46,200'], ['Sat', '52,850']].map(([d, v]) => (
              <div key={d} className="flex justify-between text-[8px] font-bold text-slate-500">
                <span>{d}</span>
                <span className="text-slate-800">NPR {v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5">
            <span className="text-[8px] font-bold text-slate-500">Daily sales report</span>
            <span className="rounded-md bg-purple-600 px-2 py-0.5 text-[8px] font-black text-white">Print</span>
          </div>
        </Frame>
      );

    case 'pending':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1.5">
            {[['RS', 'Ram Sharma', '1,240'], ['T4', 'Table 4 group', '860'], ['SK', 'Sita K.', '2,150']].map(([i, n, a]) => (
              <div key={n} className="flex items-center gap-2 rounded-lg bg-white p-1.5 ring-1 ring-slate-100">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-linear-to-br from-purple-500 to-indigo-500 text-[8px] font-black text-white">{i}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[9px] font-bold text-slate-800">{n}</p>
                  <Pill tone="bg-amber-50 text-amber-600">Pending</Pill>
                </div>
                <span className="text-[9px] font-black text-purple-700">NPR {a}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-lg bg-purple-600 py-1.5 text-center text-[8px] font-black text-white">Settle bill</div>
        </Frame>
      );

    case 'bill':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1 rounded-lg border border-dashed border-slate-200 p-2 font-mono">
            <p className="text-center text-[8px] font-black tracking-widest text-slate-700">TAX INVOICE</p>
            <div className="border-t border-dashed border-slate-200 pt-1" />
            {[['Chicken Momo x2', '480'], ['Masala Tea x3', '180'], ['Veg Chowmein', '220']].map(([n, p]) => (
              <div key={n} className="flex justify-between text-[8px] text-slate-600">
                <span>{n}</span>
                <span>{p}</span>
              </div>
            ))}
            <div className="border-t border-dashed border-slate-200 pt-1" />
            <div className="flex justify-between text-[8px] text-slate-500">
              <span>VAT 13%</span>
              <span>114</span>
            </div>
            <div className="flex justify-between text-[10px] font-black text-purple-700">
              <span>TOTAL</span>
              <span>NPR 994</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            <span className="rounded-md bg-emerald-50 py-1 text-center text-[8px] font-black text-emerald-700">Cash</span>
            <span className="rounded-md bg-[#60BB46]/15 py-1 text-center text-[8px] font-black text-[#3d8a2b]">eSewa</span>
            <span className="rounded-md bg-[#5C2D91]/10 py-1 text-center text-[8px] font-black text-[#5C2D91]">Khalti</span>
          </div>
        </Frame>
      );

    case 'kitchen':
      return (
        <Frame title={title} wide={wide}>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { t: 'T2', s: 'New', tone: 'bg-amber-50 text-amber-600', bar: 'bg-amber-400', items: ['2 Momo', '1 Thukpa'] },
              { t: 'T5', s: 'Cooking', tone: 'bg-sky-50 text-sky-600', bar: 'bg-sky-400', items: ['3 Chowmein', '2 Lassi'] },
              { t: 'T7', s: 'Ready', tone: 'bg-emerald-50 text-emerald-600', bar: 'bg-emerald-400', items: ['1 Dal Bhat', '1 Tea'] },
            ].map((k) => (
              <div key={k.t} className="overflow-hidden rounded-lg bg-white ring-1 ring-slate-100">
                <div className={`h-1 ${k.bar}`} />
                <div className="space-y-1 p-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-800">{k.t}</span>
                    <Pill tone={k.tone}>{k.s}</Pill>
                  </div>
                  {k.items.map((i) => (
                    <p key={i} className="text-[8px] font-semibold text-slate-500">{i}</p>
                  ))}
                  <div className={`mt-1 rounded py-0.5 text-center text-[7px] font-black ${k.s === 'Ready' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {k.s === 'Ready' ? 'Done' : 'Mark ready'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );

    case 'tables': {
      const t = ['a', 'o', 'a', 'r', 'o', 'a', 'x', 'o', 'a'];
      const tone: Record<string, string> = {
        a: 'bg-emerald-50 ring-emerald-200 text-emerald-700',
        o: 'bg-rose-50 ring-rose-200 text-rose-700',
        r: 'bg-amber-50 ring-amber-200 text-amber-700',
        x: 'bg-slate-100 ring-slate-200 text-slate-400',
      };
      return (
        <Frame title={title} wide={wide}>
          <div className="grid grid-cols-3 gap-1.5">
            {t.map((s, i) => (
              <div key={i} className={`flex flex-col items-center justify-center rounded-lg py-2 ring-1 ${tone[s]}`}>
                <span className="text-[10px] font-black">T{i + 1}</span>
                <span className="text-[7px] font-bold">{s === 'a' ? 'Free' : s === 'o' ? '4 seated' : s === 'r' ? 'Reserved' : 'Off'}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-[7px] font-bold text-slate-500">
            {[['bg-emerald-500', 'Available'], ['bg-rose-500', 'Occupied'], ['bg-amber-500', 'Reserved']].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${c}`} />
                {l}
              </span>
            ))}
          </div>
        </Frame>
      );
    }

    case 'order':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1.5">
            {[['🥟', 'Chicken Momo', '240', 2], ['🍜', 'Thukpa', '280', 0], ['🥤', 'Mango Lassi', '150', 1]].map(([e, n, p, q]) => (
              <div key={n as string} className="flex items-center gap-2 rounded-lg p-1.5 ring-1 ring-slate-100">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-50 text-sm">{e}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[9px] font-bold text-slate-800">{n}</p>
                  <p className="text-[8px] font-bold text-purple-600">NPR {p}</p>
                </div>
                {(q as number) > 0 ? (
                  <span className="rounded-md bg-purple-50 px-1.5 py-0.5 text-[8px] font-black text-purple-700 ring-1 ring-purple-100">- {q} +</span>
                ) : (
                  <span className="rounded-md bg-purple-600 px-1.5 py-0.5 text-[8px] font-black text-white">+ Add</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-linear-to-r from-purple-600 to-indigo-600 px-2 py-1.5 text-white">
            <span className="text-[8px] font-bold">3 items</span>
            <span className="text-[9px] font-black">NPR 630</span>
          </div>
        </Frame>
      );

    case 'tracking':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-2">
            {[
              ['Table 2', 'Preparing', 'bg-sky-50 text-sky-600', 'bg-sky-400', 50],
              ['Table 5', 'Ready', 'bg-violet-50 text-violet-600', 'bg-violet-500', 75],
              ['Table 7', 'Served', 'bg-emerald-50 text-emerald-600', 'bg-emerald-500', 100],
            ].map(([t, s, tone, bar, w]) => (
              <div key={t as string} className="rounded-lg p-1.5 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-800">{t}</span>
                  <Pill tone={tone as string}>{s}</Pill>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${bar}`} style={{ width: `${w}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );

    case 'menu':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1.5">
            {[['🥗', 'Garden Salad', 'Appetizer', '320', true], ['🍛', 'Dal Bhat Set', 'Main', '450', true], ['🍰', 'Choco Cake', 'Dessert', '260', false]].map(([e, n, c, p, on]) => (
              <div key={n as string} className="flex items-center gap-2 rounded-lg p-1.5 ring-1 ring-slate-100">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-lime-50 text-sm">{e}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[9px] font-bold text-slate-800">{n}</p>
                  <p className="text-[7px] font-bold text-slate-400">{c} · NPR {p}</p>
                </div>
                <span className={`flex h-3.5 w-6 items-center rounded-full p-0.5 ${on ? 'justify-end bg-purple-600' : 'justify-start bg-slate-200'}`}>
                  <span className="h-2.5 w-2.5 rounded-full bg-white shadow" />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-lg border border-dashed border-purple-200 py-1 text-center text-[8px] font-black text-purple-600">+ Add menu item</div>
        </Frame>
      );

    case 'stock':
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-rose-50 px-2 py-1 text-[8px] font-bold text-rose-600 ring-1 ring-rose-100">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />2 items running low
          </div>
          <div className="space-y-1.5">
            {[['Rice', 80, false], ['Chicken', 18, true], ['Cooking oil', 55, false], ['Paneer', 12, true]].map(([n, v, low]) => (
              <div key={n as string}>
                <div className="mb-0.5 flex justify-between text-[8px] font-bold">
                  <span className="text-slate-700">{n}</span>
                  <span className={low ? 'text-rose-600' : 'text-slate-400'}>{v}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${low ? 'bg-rose-400' : 'bg-linear-to-r from-purple-500 to-indigo-500'}`} style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );

    case 'audit':
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9px] font-black text-slate-800">Invoices</span>
            <Pill tone="bg-emerald-50 text-emerald-600">VAT ready</Pill>
          </div>
          <div className="overflow-hidden rounded-lg ring-1 ring-slate-100">
            <div className="grid grid-cols-3 bg-slate-50 px-2 py-1 text-[7px] font-black uppercase text-slate-400">
              <span>Invoice</span>
              <span className="text-right">Total</span>
              <span className="text-right">VAT</span>
            </div>
            {[['INV-1042', '1,130', '130'], ['INV-1043', '2,260', '260'], ['INV-1044', '565', '65']].map(([i, t, v]) => (
              <div key={i} className="grid grid-cols-3 border-t border-slate-100 px-2 py-1 font-mono text-[8px] text-slate-600">
                <span className="font-bold text-slate-800">{i}</span>
                <span className="text-right">{t}</span>
                <span className="text-right text-purple-600">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between rounded-lg bg-purple-50 px-2 py-1 text-[8px] font-black text-purple-700">
            <span>VAT collected</span>
            <span>NPR 455</span>
          </div>
        </Frame>
      );

    case 'staff':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1.5">
            {[
              ['Anil', 'Manager', 'bg-purple-50 text-purple-700', 'from-purple-500 to-indigo-500'],
              ['Priya', 'Waiter', 'bg-amber-50 text-amber-700', 'from-amber-400 to-orange-500'],
              ['Bikash', 'Kitchen', 'bg-orange-50 text-orange-700', 'from-orange-500 to-rose-500'],
              ['Sunita', 'Cashier', 'bg-emerald-50 text-emerald-700', 'from-emerald-500 to-teal-500'],
            ].map(([n, r, tone, g]) => (
              <div key={n} className="flex items-center gap-2 rounded-lg p-1.5 ring-1 ring-slate-100">
                <span className={`flex h-6 w-6 items-center justify-center rounded-md bg-linear-to-br ${g} text-[8px] font-black text-white`}>{n[0]}</span>
                <span className="flex-1 text-[9px] font-bold text-slate-800">{n}</span>
                <Pill tone={tone}>{r}</Pill>
              </div>
            ))}
          </div>
        </Frame>
      );

    case 'settings':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1.5">
            {[['Business name', 'Himalayan Cafe'], ['PAN / VAT', '601234567']].map(([l, v]) => (
              <div key={l}>
                <p className="text-[7px] font-bold uppercase text-slate-400">{l}</p>
                <div className="rounded-md bg-slate-50 px-2 py-1 text-[9px] font-bold text-slate-700 ring-1 ring-slate-100">{v}</div>
              </div>
            ))}
            {[['Auto print receipt', true], ['Nepali language', false]].map(([l, on]) => (
              <div key={l as string} className="flex items-center justify-between pt-0.5">
                <span className="text-[9px] font-bold text-slate-600">{l}</span>
                <span className={`flex h-3.5 w-6 items-center rounded-full p-0.5 ${on ? 'justify-end bg-purple-600' : 'justify-start bg-slate-200'}`}>
                  <span className="h-2.5 w-2.5 rounded-full bg-white shadow" />
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-lg bg-purple-600 py-1 text-center text-[8px] font-black text-white">Save changes</div>
        </Frame>
      );

    case 'offline':
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-amber-50 px-2 py-1.5 ring-1 ring-amber-100">
            <svg className="h-3.5 w-3.5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0M12 20h.01" />
            </svg>
            <span className="text-[8px] font-black text-amber-700">Offline, billing continues</span>
          </div>
          <div className="space-y-1">
            {[['Bill #2041', 'Synced', 'bg-emerald-50 text-emerald-600'], ['Bill #2042', 'Synced', 'bg-emerald-50 text-emerald-600'], ['Bill #2043', 'Queued', 'bg-slate-100 text-slate-500'], ['Bill #2044', 'Queued', 'bg-slate-100 text-slate-500']].map(([b, s, tone]) => (
              <div key={b} className="flex items-center justify-between rounded-md px-1.5 py-1 ring-1 ring-slate-100">
                <span className="font-mono text-[8px] font-bold text-slate-700">{b}</span>
                <Pill tone={tone}>{s}</Pill>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500" />
          </div>
          <p className="mt-1 text-[7px] font-bold text-slate-400">Auto-sync when back online</p>
        </Frame>
      );

    case 'payments':
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-[8px] font-bold uppercase text-slate-400">Total</span>
            <span className="text-sm font-black text-slate-800">NPR 1,500</span>
          </div>
          <div className="mb-1.5 flex h-2.5 overflow-hidden rounded-full">
            <div className="w-3/5 bg-emerald-500" />
            <div className="w-2/5 bg-rose-500" />
          </div>
          <div className="space-y-1">
            {[['bg-emerald-500', 'Cash', '900'], ['bg-rose-500', 'Fonepay', '600']].map(([c, l, v]) => (
              <div key={l} className="flex items-center justify-between text-[8px] font-bold text-slate-600">
                <span className="flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${c}`} />
                  {l}
                </span>
                <span className="text-slate-800">NPR {v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-2 py-1 text-[8px] font-black text-emerald-700">
            <span>Fully paid</span>
            <span>Change NPR 0</span>
          </div>
        </Frame>
      );

    case 'customer':
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 text-[10px] font-black text-white">SK</span>
            <div>
              <p className="text-[10px] font-black text-slate-800">Sita Karki</p>
              <p className="font-mono text-[8px] text-slate-400">98XX-XXX-210</p>
            </div>
            <Pill tone="ml-auto bg-amber-50 text-amber-600">Gold</Pill>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[['Visits', '14'], ['Spent', '18.4k'], ['Points', '320']].map(([l, v]) => (
              <div key={l} className="rounded-lg bg-purple-50/80 p-1.5 text-center ring-1 ring-purple-100">
                <p className="text-[10px] font-black text-purple-700">{v}</p>
                <p className="text-[7px] font-bold uppercase text-slate-400">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            {[['Last visit', '2 days ago'], ['Favourite', 'Mango juice']].map(([l, v]) => (
              <div key={l} className="flex justify-between text-[8px] font-bold text-slate-500">
                <span>{l}</span>
                <span className="text-slate-800">{v}</span>
              </div>
            ))}
          </div>
        </Frame>
      );

    case 'barcode':
      return (
        <Frame title={title} wide={wide}>
          <div className="relative mb-2 flex h-10 items-end justify-center gap-[2px] rounded-lg bg-slate-50 px-3 py-1.5 ring-1 ring-slate-100">
            {[3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1].map((w, i) => (
              <span key={i} className="h-full bg-slate-800" style={{ width: `${w}px` }} />
            ))}
            <span className="absolute inset-x-2 top-1/2 h-0.5 bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
          </div>
          <div className="space-y-1">
            {[['Wai Wai Noodles', '2', '40'], ['Coca-Cola 500ml', '1', '90'], ['Amul Butter', '1', '310']].map(([n, q, p]) => (
              <div key={n} className="flex items-center justify-between text-[8px]">
                <span className="font-bold text-slate-700">{n}</span>
                <span className="text-slate-400">x{q}</span>
                <span className="font-mono font-bold text-slate-800">{p}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between rounded-lg bg-purple-600 px-2 py-1.5 text-[9px] font-black text-white">
            <span>Charge</span>
            <span>NPR 480</span>
          </div>
        </Frame>
      );

    case 'automation':
      return (
        <Frame title={title} wide={wide}>
          <div className="flex flex-col items-center">
            {[
              ['Trigger', 'New invoice email', 'bg-sky-50 text-sky-700 ring-sky-100'],
              ['AI step', 'Extract data', 'bg-purple-50 text-purple-700 ring-purple-100'],
              ['Action', 'Update accounts', 'bg-emerald-50 text-emerald-700 ring-emerald-100'],
            ].map(([l, v, tone], i) => (
              <div key={l} className="flex w-full flex-col items-center">
                {i > 0 && <span className="h-3 w-0.5 bg-purple-200" />}
                <div className={`w-full rounded-lg px-2 py-1.5 ring-1 ${tone}`}>
                  <p className="text-[7px] font-black uppercase opacity-70">{l}</p>
                  <p className="text-[9px] font-black">{v}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-[8px] font-bold">
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Running
            </span>
            <span className="text-slate-400">1,284 runs today</span>
          </div>
        </Frame>
      );

    case 'infrastructure':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1.5">
            {[['API gateway', '99.99%'], ['Task queue', '99.97%'], ['Cache layer', '100%']].map(([n, u]) => (
              <div key={n} className="rounded-lg p-1.5 ring-1 ring-slate-100">
                <div className="mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[9px] font-bold text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {n}
                  </span>
                  <span className="text-[8px] font-black text-emerald-600">{u}</span>
                </div>
                <div className="flex gap-[2px]">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className={`h-2.5 flex-1 rounded-[1px] ${i === 17 && n === 'Task queue' ? 'bg-amber-300' : 'bg-emerald-300'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Frame>
      );

    case 'model':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1.5">
            {[['Support bot v3', 96], ['Invoice parser', 92], ['Lead scorer', 88]].map(([n, a]) => (
              <div key={n as string} className="rounded-lg p-1.5 ring-1 ring-slate-100">
                <div className="mb-1 flex justify-between text-[9px] font-bold">
                  <span className="text-slate-800">{n}</span>
                  <span className="text-purple-600">{a}% acc.</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-linear-to-r from-purple-500 to-indigo-500" style={{ width: `${a}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <span className="rounded-md bg-purple-600 py-1 text-center text-[8px] font-black text-white">Fine-tune</span>
            <span className="rounded-md bg-slate-100 py-1 text-center text-[8px] font-black text-slate-600">Checkpoints</span>
          </div>
        </Frame>
      );

    case 'api': {
      const lines: [string, string][] = [
        ['text-purple-600', 'POST /v1/messages'],
        ['text-slate-500', '{'],
        ['text-slate-700', '  "to": "98XXXXXXXX",'],
        ['text-slate-700', '  "text": "Your order is ready"'],
        ['text-slate-500', '}'],
        ['text-emerald-600', '200 OK · 84ms'],
      ];
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-0.5 rounded-lg bg-slate-50 p-2 font-mono ring-1 ring-slate-100">
            {lines.map(([c, l], i) => (
              <p key={i} className={`whitespace-pre text-[8px] font-semibold ${c}`}>
                {l}
              </p>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {['REST', 'Webhooks', 'API keys'].map((t) => (
              <Pill key={t} tone="bg-purple-50 text-purple-700">{t}</Pill>
            ))}
          </div>
        </Frame>
      );
    }

    case 'otp':
      return (
        <Frame title={title} wide={wide}>
          <div className="mx-auto w-40 rounded-2xl bg-slate-50 p-2 ring-1 ring-slate-100">
            <p className="mb-1 text-[7px] font-bold text-slate-400">CORNOR · now</p>
            <div className="rounded-xl rounded-tl-sm bg-white p-2 text-[8px] font-semibold text-slate-700 shadow-sm">
              Your verification code is <span className="font-black text-purple-700">482916</span>. Valid for 5 minutes.
            </div>
          </div>
          <div className="mt-2 flex justify-center gap-1">
            {'482916'.split('').map((d, i) => (
              <span key={i} className="flex h-6 w-5 items-center justify-center rounded-md bg-purple-50 text-[10px] font-black text-purple-700 ring-1 ring-purple-100">{d}</span>
            ))}
          </div>
          <p className="mt-1.5 text-center text-[8px] font-bold text-emerald-600">Delivered in 1.2s</p>
        </Frame>
      );

    case 'bulk':
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-2 grid grid-cols-2 gap-1.5">
            {[['Sent', '12,480'], ['Delivered', '98.6%']].map(([l, v]) => (
              <div key={l} className="rounded-lg bg-purple-50/80 p-1.5 ring-1 ring-purple-100">
                <p className="text-[7px] font-bold uppercase text-slate-400">{l}</p>
                <p className="text-[11px] font-black text-purple-700">{v}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl rounded-tl-sm bg-slate-50 p-2 text-[8px] font-semibold text-slate-700 ring-1 ring-slate-100">
            Hi <span className="font-black text-purple-600">{'{name}'}</span>, enjoy 20% off this festive season. Show this SMS at the counter.
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[86%] rounded-full bg-linear-to-r from-purple-500 to-indigo-500" />
          </div>
          <p className="mt-1 text-[7px] font-bold text-slate-400">Campaign 86% delivered</p>
        </Frame>
      );

    case 'chat':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1.5">
            <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-slate-100 px-2 py-1 text-[8px] font-semibold text-slate-700">Is my table booked for 7 PM?</div>
            <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-purple-600 px-2 py-1 text-[8px] font-semibold text-white">Yes, table for 4 confirmed at 7 PM.</div>
            <div className="max-w-[80%] rounded-xl rounded-tl-sm bg-slate-100 px-2 py-1 text-[8px] font-semibold text-slate-700">Great, thank you!</div>
            <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-purple-600 px-2 py-1 text-[8px] font-semibold text-white">See you soon.</div>
          </div>
          <div className="mt-2 flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 ring-1 ring-slate-100">
            <span className="flex-1 text-[8px] text-slate-400">Type a reply</span>
            <span className="rounded-md bg-purple-600 px-1.5 py-0.5 text-[7px] font-black text-white">Send</span>
          </div>
        </Frame>
      );

    case 'schedule':
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[7px] font-bold text-slate-400">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 14 }).map((_, i) => {
              const on = [2, 5, 9, 12].includes(i);
              return (
                <span key={i} className={`flex h-5 items-center justify-center rounded-md text-[8px] font-bold ${on ? 'bg-purple-600 text-white' : 'bg-slate-50 text-slate-500'}`}>
                  {i + 1}
                </span>
              );
            })}
          </div>
          <div className="mt-2 space-y-1">
            {[['Fri 9:00 AM', 'Weekend offer'], ['Mon 8:00 AM', 'Payment reminder']].map(([t, n]) => (
              <div key={t} className="flex items-center justify-between rounded-md px-1.5 py-1 ring-1 ring-slate-100">
                <span className="text-[8px] font-bold text-slate-700">{n}</span>
                <Pill tone="bg-purple-50 text-purple-700">{t}</Pill>
              </div>
            ))}
          </div>
        </Frame>
      );

    case 'templates':
      return (
        <Frame title={title} wide={wide}>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-[8px] font-bold text-slate-400">Sender ID</span>
            <span className="rounded-md bg-purple-600 px-2 py-0.5 font-mono text-[8px] font-black text-white">CORNOR</span>
          </div>
          <div className="space-y-1.5">
            {[['Order ready', 'Your order {id} is ready for pickup.'], ['OTP', 'Your code is {otp}.']].map(([n, b]) => (
              <div key={n} className="rounded-lg p-1.5 ring-1 ring-slate-100">
                <div className="mb-0.5 flex items-center justify-between">
                  <span className="text-[9px] font-black text-slate-800">{n}</span>
                  <Pill tone="bg-emerald-50 text-emerald-600">Approved</Pill>
                </div>
                <p className="text-[8px] text-slate-500">{b}</p>
              </div>
            ))}
          </div>
        </Frame>
      );

    case 'logging':
      return (
        <Frame title={title} wide={wide}>
          <div className="space-y-1 font-mono">
            {[
              ['10:42:07', 'workflow.run', 'bg-emerald-500'],
              ['10:42:09', 'api.call /extract', 'bg-emerald-500'],
              ['10:42:11', 'model.retry', 'bg-amber-400'],
              ['10:42:12', 'workflow.done', 'bg-emerald-500'],
            ].map(([t, e, c]) => (
              <div key={t} className="flex items-center gap-2 rounded-md px-1.5 py-1 ring-1 ring-slate-100">
                <span className={`h-1.5 w-1.5 rounded-full ${c}`} />
                <span className="text-[8px] text-slate-400">{t}</span>
                <span className="truncate text-[8px] font-bold text-slate-700">{e}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between text-[8px] font-bold">
            <span className="text-slate-500">Audit trail</span>
            <Pill tone="bg-purple-50 text-purple-700">Encrypted</Pill>
          </div>
        </Frame>
      );

    default:
      return null;
  }
}

/** Shows the drawn visual; if a real screenshot exists at feature.image, it fades in on top. */
function FeatureMedia({ feature, productId, wide }: { feature: Feature; productId: string; wide?: boolean }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const kind = getVisualKind(feature.title);

  return (
    <div className="relative flex w-full justify-center">
      {!imgLoaded && <FeatureVisual kind={kind} title={feature.title} productId={productId} wide={wide} />}
      {feature.image && !imgFailed && (
        <img
          src={feature.image}
          alt={`${feature.title} screen`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgFailed(true)}
          className={
            imgLoaded
              ? `w-full ${wide ? 'max-w-[440px]' : 'max-w-[320px]'} rounded-2xl object-contain shadow-[0_24px_48px_-16px_rgba(76,29,149,0.30)] ring-1 ring-slate-900/5`
              : 'pointer-events-none absolute h-px w-px opacity-0'
          }
        />
      )}
    </div>
  );
}

// ==========================================
// SECTION HEADING
// ==========================================

function SectionHeading({ eyebrow, title, subtitle, center = false }: { eyebrow: string; title: string; subtitle?: React.ReactNode; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-purple-700">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-[#1e003a] lg:text-4xl">{title}</h2>
      {subtitle && <div className="mt-3 text-sm font-medium leading-relaxed text-slate-500 lg:text-base">{subtitle}</div>}
    </div>
  );
}

const FEATURE_TINTS = [
  'from-[#f3e8ff] via-[#faf5ff] to-white',
  'from-[#e0e7ff] via-[#eef2ff] to-white',
  'from-[#fce7f3] via-[#fdf2f8] to-white',
  'from-[#dcfce7] via-[#f0fdf4] to-white',
  'from-[#fef3c7] via-[#fffbeb] to-white',
  'from-[#e0f2fe] via-[#f0f9ff] to-white',
];

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'key-features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'why-it-works', label: 'Why It Works' },
];

// ==========================================
// PAGE
// ==========================================

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [storyOpen, setStoryOpen] = useState(false);
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Smooth entrance animation + reset per product
  useEffect(() => {
    if (activeProduct) {
      setIsVisible(false);
      setStoryOpen(false);
      setHeroImgFailed(false);
      setActiveSection('overview');
      setScrollProgress(0);
      setIsScrolled(false);
      overlayRef.current?.scrollTo({ top: 0 });
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [activeProduct]);

  // Lock body scroll + close on Escape while the detail view is open
  useEffect(() => {
    if (!activeProduct) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProduct]);

  // Track which section is in view for the sticky sub-nav
  useEffect(() => {
    if (!activeProduct) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: overlayRef.current, rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    const timeout = setTimeout(() => {
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [activeProduct]);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setActiveProduct(null), 200);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOverlayScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setIsScrolled(el.scrollTop > 24);
    const max = el.scrollHeight - el.clientHeight;
    setScrollProgress(max > 0 ? Math.min(el.scrollTop / max, 1) : 0);
  };

  // ---- Derived data for the open product ----
  const isComingSoon = !!activeProduct?.pending;
  const notifyHref = activeProduct
    ? `mailto:info@cornortech.com?subject=${encodeURIComponent(`Notify me when ${activeProduct.name} launches`)}`
    : '#';
  const demoHref = activeProduct
    ? `mailto:info@cornortech.com?subject=${encodeURIComponent(`Live demo request: ${activeProduct.name}`)}`
    : '#';
  const primaryHref = isComingSoon ? notifyHref : activeProduct?.loginUrl ?? '#';
  const trialTier = activeProduct?.pricing.find((p) => p.name === 'Demo');
  const premiumTier = activeProduct?.pricing.find((p) => p.highlighted);
  const trialLabel = trialTier?.period?.replace(/-/g, ' ') || 'free trial';
  const paragraphs = activeProduct ? activeProduct.longDesc.split('\n\n') : [];
  const visibleParagraphs = storyOpen ? paragraphs : paragraphs.slice(0, 3);

  return (
    <main className="min-h-screen bg-white font-sans" id="products">
      <Header />

      {/* ==== Hero ==== */}
      <section className="relative bg-linear-to-br from-[#1e003a] via-[#2d0a52] to-[#3b1266] pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-purple-500/20 pointer-events-none" />
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full border border-purple-400/10 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-purple-500/15 pointer-events-none" />

        <p className="absolute top-6 lg:top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[16vw] font-black uppercase tracking-tighter text-white/[0.03] select-none pointer-events-none leading-none">
          Products
        </p>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-[#a3e635]/20 text-[#a3e635] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#a3e635]/30">
            Built by Cornor Tech — 4 products live
          </span>

          <h1 className="text-4xl lg:text-6xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            Software that runs<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#9333EA] via-[#6366f1] to-[#a855f7]">
              your business
            </span>
          </h1>

          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            From restaurant floors to retail counters, our products are built to handle real operations — fast, reliable, and made for how businesses actually work.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#our-products"
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-br from-[#6a5acd] to-[#9370db] text-white rounded-xl font-black hover:brightness-110 transition-all shadow-lg shadow-[#9333EA]/30"
            >
              Explore Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="mailto:info@cornortech.com"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Talk to Us
            </a>
          </div>
        </div>
      </section>

      <CTA />

      {/* ==== Products Grid ==== */}
      <section id="our-products" className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center gap-3 mb-5 justify-center">
              <div className="h-px w-8 bg-[#9333EA] rounded-full" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9333EA]">
                What we&apos;ve built
              </span>
              <div className="h-px w-8 bg-[#9333EA] rounded-full" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black leading-[0.95] tracking-tight mb-3">
              <span className="text-[#1e003a]">Our </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#9333EA] via-[#6366f1] to-[#a855f7]">
                Products
              </span>
            </h2>
            <p className="text-gray-500 text-sm font-semibold">Click a product to see the full details</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-7">
            {PRODUCTS.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setActiveProduct(product)}
                className="group text-left bg-white rounded-3xl border border-gray-200/80 
             hover:border-[#9333EA]/30 hover:shadow-[0_20px_50px_rgba(147,51,234,0.12)] 
             hover:-translate-y-1.5 transition-all duration-300 overflow-hidden 
             cursor-pointer flex flex-col relative
             w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.25rem)]"
              >
                {/* Logo / Header Image */}
                <div className="relative h-62 bg-slate-950 overflow-hidden shrink-0 w-full">
                  <img
                    src={product.logo}
                    alt={`${product.name} Logo`}
                    className="absolute inset-0 w-full h-full object-contain object-center p-1 transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).style.opacity = '0.15';
                    }}
                  />

                  {/* Gradient overlay for high text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Category badge — top left */}
                  {product.category && (
                    <div className="absolute top-0.5 left-1.3 z-10">
                      <span className="px-3 py-1 bg-black/100 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  )}

                  {/* Coming Soon badge — top right */}
                  {product.pending && (
                    <div className="absolute top-4 right-4 z-20">
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-[#9333EA] text-[#1e003a] text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-[#9333EA]/40 border border-purple-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1e003a] animate-pulse" />
                        {product.pending}
                      </span>
                    </div>
                  )}

                  {/* Product Title & Tagline overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-xl font-black text-white leading-tight mb-1 group-hover:text-purple-200 transition-colors">
                      {product.name}
                    </h3>
                    {product.tagline && (
                      <p className="text-white/80 text-xs font-bold line-clamp-1">
                        {product.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 lg:p-6 flex flex-col flex-1 bg-white">
                  {product.desc && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 font-medium line-clamp-3">
                      {product.desc}
                    </p>
                  )}

                  {/* Highlights */}
                  {product.highlights && product.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {product.highlights.slice(0, 3).map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-[#9333EA]/5 text-[#9333EA] text-[10px] font-bold rounded-lg border border-[#9333EA]/10"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-sm font-black text-[#9333EA] mt-auto pt-2">
                    <span>Read Full Details</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* ==================================================================
          FULL-SCREEN PRODUCT DETAIL
      ================================================================== */}
      {activeProduct && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-detail-title"
          onScroll={handleOverlayScroll}
          className={`fixed inset-0 z-[60] overflow-y-auto bg-white font-sans transition-opacity duration-300 ease-out ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`min-h-screen transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-4'}`}>
            {/* ==== Sticky top bar ==== */}
            <div
              className={`sticky top-0 z-40 bg-white/85 backdrop-blur-xl transition-shadow duration-300 ${
                isScrolled ? 'border-b border-purple-100 shadow-[0_8px_24px_-12px_rgba(76,29,149,0.18)]' : 'border-b border-transparent'
              }`}
            >
              {/* Scroll progress */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-transparent">
                <div
                  className="h-full bg-linear-to-r from-purple-600 via-violet-500 to-indigo-500 transition-[width] duration-150"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>

              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 lg:px-8">
                <button
                  onClick={closeModal}
                  className="group flex min-w-0 cursor-pointer items-center gap-2.5 rounded-xl py-1.5 pr-2 text-sm font-bold text-slate-600 outline-none transition-colors hover:text-purple-700 focus-visible:ring-4 focus-visible:ring-purple-500/25"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white transition group-hover:border-purple-300 group-hover:bg-purple-50">
                    <ChevronLeft />
                  </span>
                  <span className="hidden text-slate-400 sm:inline">Products</span>
                  <span className="hidden text-slate-300 sm:inline">/</span>
                  <span className="truncate font-extrabold text-[#1e003a]">{activeProduct.name}</span>
                </button>

                <nav aria-label="Product sections" className="hidden items-center gap-1 rounded-full border border-purple-100 bg-purple-50/70 p-1 md:flex">
                  {SECTIONS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => scrollToSection(tab.id)}
                      aria-current={activeSection === tab.id ? 'true' : undefined}
                      className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-black outline-none transition-all duration-200 focus-visible:ring-4 focus-visible:ring-purple-500/25 ${
                        activeSection === tab.id
                          ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-sm shadow-purple-500/30'
                          : 'text-purple-700 hover:bg-white hover:text-purple-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={primaryHref}
                    target={isComingSoon ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="hidden items-center gap-1.5 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-black text-white shadow-md shadow-purple-500/25 transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97] sm:flex"
                  >
                    {isComingSoon ? 'Notify me' : 'Login'}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={closeModal}
                    aria-label="Close product details"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-600 outline-none transition-all duration-300 hover:rotate-90 hover:bg-purple-100 hover:text-purple-700 focus-visible:ring-4 focus-visible:ring-purple-500/25"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              {/* Mobile section tabs */}
              <nav aria-label="Product sections" className="flex gap-1.5 overflow-x-auto px-4 pb-2.5 md:hidden [&::-webkit-scrollbar]:hidden">
                {SECTIONS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-black transition-all ${
                      activeSection === tab.id ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* ==== Hero ==== */}
            <section className="relative overflow-hidden bg-linear-to-b from-[#f6eeff] via-[#fbf8ff] to-white">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(147,51,234,0.25) 1px, transparent 1px)',
                  backgroundSize: '26px 26px',
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent)',
                }}
              />
              <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-purple-300/30 blur-[110px]" />
              <div className="pointer-events-none absolute -right-24 top-24 h-[380px] w-[380px] rounded-full bg-indigo-300/25 blur-[110px]" />

              <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pt-16">
                {/* Left: copy */}
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-white px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-purple-700 shadow-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                      {activeProduct.category}
                    </span>
                    {activeProduct.pending ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a3e635] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#1e003a]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1e003a]" />
                        {activeProduct.pending}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-700">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        IRD Verified 
                      </span>
                    )}
                  </div>

                  <h1 id="product-detail-title" className="text-4xl font-black leading-[0.98] tracking-tight text-[#1e003a] lg:text-6xl">
                    {activeProduct.name}
                  </h1>
                  <p className="mt-4 bg-linear-to-r from-purple-700 via-violet-600 to-indigo-600 bg-clip-text text-lg font-extrabold text-transparent lg:text-2xl">
                    {activeProduct.tagline}
                  </p>
                  <p className="mt-4 max-w-xl text-[15px] font-medium leading-relaxed text-slate-600 lg:text-base">
                    {activeProduct.desc}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href={primaryHref}
                      target={isComingSoon ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-linear-to-r from-purple-600 via-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-purple-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/40 active:scale-[0.98]"
                    >
                      {isComingSoon ? 'Notify me at launch' : 'See it in action'}
                      <ArrowRight />
                    </a>
                    <button
                      onClick={() => scrollToSection('key-features')}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-purple-200 bg-white px-7 py-3.5 text-sm font-bold text-purple-700 shadow-xs transition-all hover:border-purple-300 hover:bg-purple-50 active:scale-[0.98]"
                    >
                      Explore features
                    </button>
                  </div>

                  {/* Quick facts */}
                  <dl className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-purple-100 rounded-2xl border border-purple-100 bg-white/80 shadow-xs backdrop-blur">
                    <div className="px-4 py-3">
                      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Features</dt>
                      <dd className="mt-0.5 text-xl font-black text-[#1e003a]">{activeProduct.features.length} +</dd>
                    </div>
                    <div className="px-4 py-3">
                      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">Free trial</dt>
                      <dd className="mt-0.5 truncate text-xl font-black capitalize text-[#1e003a]">
                        {trialTier?.period?.split(' ')[0]?.replace('-day', ' days') || 'Yes'}
                      </dd>
                    </div>
                    <div className="px-4 py-3">
                      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">From</dt>
                      <dd className="mt-0.5 truncate text-xl font-black text-purple-700">{premiumTier?.price.replace('NPR ', 'Rs ') || 'Free'}</dd>
                    </div>
                  </dl>
                </div>

                {/* Right: product visual */}
        <div className="relative w-full flex justify-center">
  {/* Expanded glow wrapper */}
  <div className="absolute -inset-10 rounded-[56px] bg-linear-to-br from-purple-400/35 via-violet-300/30 to-indigo-300/35 blur-3xl" />
  
  {/* Breakout container: Makes the whole card wider than its parent column */}
  <div className="relative w-[112%]-ml-[6%] sm:w-[120%] sm:-ml-[10%] overflow-hidden rounded-3xl bg-white shadow-[0_60px_120px_-20px_rgba(76,29,149,0.45)] ring-1 ring-purple-900/10">
    <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-rose-300" />
      <span className="h-3 w-3 rounded-full bg-amber-300" />
      <span className="h-3 w-3 rounded-full bg-emerald-300" />
      <span className="ml-3 flex-1 truncate rounded-md bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-400 ring-1 ring-slate-100">
        {activeProduct.loginUrl.replace(/^https?:\/\//, '')}
      </span>
    </div>
    
    {/* Extra large natural container */}
    <div className="relative bg-slate-950 flex items-center justify-center w-full">
      {!heroImgFailed ? (
        <img
          src={activeProduct.image}
          alt={`${activeProduct.name} preview`}
          className="w-full h-auto object-contain block"
          onError={() => setHeroImgFailed(true)}
        />
      ) : (
        <div className="py-20 flex items-center justify-center w-full">
          <img
            src={activeProduct.logo}
            alt={`${activeProduct.name} logo`}
            className="max-h-36 max-w-[70%] object-contain"
          />
        </div>
      )}
    </div>
  </div>

  {/* Floating chips (adjusted positions for the wider breakout layout) */}
  <div className="absolute -left-2 sm:-left-24 top-8 hidden rounded-2xl border border-purple-100 bg-white/95 px-4 py-3 shadow-2xl shadow-purple-900/15 backdrop-blur sm:block z-20">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Built for</p>
    <p className="text-sm font-black text-[#1e003a]">{activeProduct.highlights[0]}</p>
  </div>
  <div className="absolute -bottom-6 -right-2 sm:-right-8 hidden items-center gap-3 rounded-2xl border border-emerald-100 bg-white/95 px-4 py-3 shadow-2xl shadow-emerald-900/15 backdrop-blur sm:flex z-20">
    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
      <BoltIcon className="h-5 w-5" />
    </span>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Real time</p>
      <p className="text-sm font-black text-[#1e003a]">{activeProduct.highlights[activeProduct.highlights.length - 1]}</p>
    </div>
  </div>
</div>
              </div>

              {/* Highlights strip */}
              <div className="relative border-y border-purple-100 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-6 py-4 lg:px-8">
                  {activeProduct.highlights.map((h) => (
                    <span key={h} className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-1.5 text-[11px] font-bold text-purple-800 ring-1 ring-inset ring-purple-100">
                      <CheckIcon className="h-3 w-3 text-purple-600" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ==== Body ==== */}
            <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:px-8 lg:pt-24">
              {/* ==== Overview ==== */}
              <section id="overview" className="mb-28 scroll-mt-32">
                <SectionHeading
                  eyebrow="Overview"
                  title={`What ${activeProduct.name} does for you`}
                  subtitle="The full picture, in plain words."
                />

                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-8">
                    <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_4px_30px_rgba(15,23,42,0.04)] lg:p-10">
                      {visibleParagraphs.map((para, i) =>
                        i === 0 ? (
                          <p key={i} className="text-lg font-semibold leading-relaxed text-slate-800 lg:text-xl">
                            <span className="float-left mr-3 mt-1 text-5xl font-black leading-[0.8] text-purple-600 lg:text-6xl">
                              {para.charAt(0)}
                            </span>
                            {para.slice(1)}
                          </p>
                        ) : (
                          <div key={i} className="mt-6 flex gap-4 border-t border-slate-100 pt-6">
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-purple-100 to-indigo-100 text-xs font-black text-purple-700">
                              {String(i).padStart(2, '0')}
                            </span>
                            <p className="text-[15px] font-medium leading-relaxed text-slate-600 lg:text-base">{para}</p>
                          </div>
                        )
                      )}

                      {paragraphs.length > 3 && (
                        <div className="relative mt-6">
                          {!storyOpen && (
                            <div className="pointer-events-none absolute -top-24 left-0 right-0 h-24 bg-linear-to-t from-white to-transparent" />
                          )}
                          <button
                            onClick={() => setStoryOpen((o) => !o)}
                            aria-expanded={storyOpen}
                            className="mx-auto flex cursor-pointer items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-5 py-2.5 text-xs font-black text-purple-700 transition hover:bg-purple-100 active:scale-[0.97]"
                          >
                            {storyOpen ? 'Show less' : `Read the full story (${paragraphs.length - 3} more)`}
                            <ChevronDown className={`h-4 w-4 transition-transform ${storyOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <aside className="lg:col-span-4">
                    <div className="space-y-4 lg:sticky lg:top-28">
                      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#1e003a] via-[#2d0a52] to-[#3b1266] p-6 shadow-xl shadow-purple-950/15 lg:p-7">
                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-white/10" />
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
                          <BoltIcon className="h-3.5 w-3.5" />
                          Built for
                        </p>
                        <p className="text-sm font-bold leading-relaxed text-white">{activeProduct.desc}</p>
                        <div className="my-5 h-px bg-white/10" />
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">Category</p>
                        <span className="inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
                          {activeProduct.category}
                        </span>
                      </div>

                      <div className="rounded-3xl border border-purple-100 bg-purple-50/50 p-6 lg:p-7">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-purple-700">Plans</p>
                        <ul className="space-y-2">
                          {activeProduct.pricing.map((t) => (
                            <li key={t.name} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs ring-1 ring-purple-100">
                              <span className="font-bold text-slate-700">{t.name}</span>
                              <span className="font-black text-purple-700">{t.price}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => scrollToSection('pricing')}
                          className="mt-3 w-full cursor-pointer text-center text-xs font-black text-purple-700 hover:text-purple-900"
                        >
                          Compare plans
                        </button>
                      </div>

                      <a                      
                        href={primaryHref}
                        target={isComingSoon ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
                      >
                        {isComingSoon ? `Get notified about ${activeProduct.name}` : `Login to ${activeProduct.name}`}
                        <ArrowRight />
                      </a>
                    </div>
                  </aside>
                </div>
              </section>

              {/* ==== Key Features ==== */}
              <section id="key-features" className="mb-28 scroll-mt-32">
                <SectionHeading
                  eyebrow="Key features"
                  title="Everything you need, in one clean system"
                  subtitle={`${activeProduct.features.length} features working together, so your team spends less time on admin and more time on customers.`}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {activeProduct.features.map((feature, i) => {
                    const isHero = i === 0;
                    const tint = FEATURE_TINTS[i % FEATURE_TINTS.length];
                    return (
                      <article
                        key={feature.title}
                        className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-purple-100/70 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-purple-200 hover:shadow-[0_28px_56px_-12px_rgba(147,51,234,0.22)] ${
                          isHero ? 'sm:col-span-2 lg:flex-row' : ''
                        }`}
                      >
                        {/* Visual area */}
                        <div
                          className={`relative flex items-start justify-center overflow-hidden bg-linear-to-br ${tint} px-6 pt-8 ${
                            isHero ? 'h-72 lg:h-auto lg:min-h-[340px] lg:w-[58%] lg:items-center lg:pb-8' : 'h-60'
                          }`}
                        >
                          <div
                            className="pointer-events-none absolute inset-0 opacity-40"
                            style={{
                              backgroundImage: 'radial-gradient(circle, rgba(147,51,234,0.18) 1px, transparent 1px)',
                              backgroundSize: '18px 18px',
                            }}
                          />
                          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-400/15 blur-3xl" />
                          <span className="absolute left-4 top-4 z-10 flex h-7 min-w-7 items-center justify-center rounded-full bg-white/90 px-2 text-[10px] font-black text-purple-700 shadow-sm backdrop-blur">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {isHero && (
                            <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                              <SparkIcon className="h-3 w-3" />
                              Core
                            </span>
                          )}
                          <div className="relative w-full transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
                            <FeatureMedia feature={feature} productId={activeProduct.id} wide={isHero} />
                          </div>
                          {!isHero && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-white/90 to-transparent" />}
                        </div>

                        {/* Text */}
                        <div className={`relative flex flex-col justify-center p-6 ${isHero ? 'lg:w-[42%] lg:p-9' : ''}`}>
                          <h3 className={`font-black leading-snug text-[#1e003a] ${isHero ? 'text-xl lg:text-2xl' : 'text-base'}`}>
                            {feature.title}
                          </h3>
                          <p className={`mt-1.5 font-medium leading-relaxed text-slate-500 ${isHero ? 'text-sm lg:text-base' : 'text-[13px]'}`}>
                            {feature.desc}
                          </p>
                          {isHero && (
                            <div className="mt-5 flex flex-wrap gap-1.5">
                              {activeProduct.highlights.slice(0, 3).map((h) => (
                                <span key={h} className="rounded-lg bg-purple-50 px-2.5 py-1 text-[10px] font-bold text-purple-700 ring-1 ring-inset ring-purple-100">
                                  {h}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>

              {/* ==== Pricing ==== */}
              <section id="pricing" className="mb-28 scroll-mt-32">
                <SectionHeading
                  eyebrow="Pricing"
                  title="Simple pricing, built to scale with you"
                  subtitle={
                    <>
                      Try it risk-free, then pick the plan that fits.{' '}
                      <span className="font-semibold text-purple-600">Paid plans are shown excluding VAT.</span>
                    </>
                  }
                />

                <div className="grid items-stretch gap-6 lg:grid-cols-3">
                  {(activeProduct.pricing ?? []).map((tier) => {
                    const ctaHref = isComingSoon
                      ? notifyHref
                      : tier.name === 'Enterprise'
                      ? `mailto:info@cornortech.com?subject=${encodeURIComponent(`Enterprise enquiry: ${activeProduct.name}`)}`
                      : activeProduct.loginUrl;
                    const external = !ctaHref.startsWith('mailto:');
                    return (
                      <div
                        key={tier.name}
                        className={`relative flex flex-col rounded-3xl p-7 transition-all duration-300 lg:p-8 ${
                          tier.highlighted
                            ? 'border border-purple-400/30 bg-linear-to-br from-[#1e003a] via-[#2d0a52] to-[#3b1266] shadow-2xl shadow-purple-950/25 lg:-translate-y-3'
                            : 'border border-slate-100 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:border-purple-200 hover:shadow-[0_16px_36px_-12px_rgba(147,51,234,0.18)]'
                        }`}
                      >
                        {tier.highlighted && (
                          <>
                            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/10" />
                            <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />
                          </>
                        )}

                        {tier.tag && (
                          <span
                            className={`absolute -top-3.5 left-7 rounded-full px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-md ${
                              tier.highlighted ? 'bg-[#a3e635] text-[#1e003a]' : 'border border-purple-200 bg-white text-purple-700'
                            }`}
                          >
                            {tier.tag}
                          </span>
                        )}

                        <p className={`relative mb-5 mt-3 text-[11px] font-black uppercase tracking-[0.2em] ${tier.highlighted ? 'text-purple-300' : 'text-slate-400'}`}>
                          {tier.name}
                        </p>

                        <div className="relative mb-1 flex flex-wrap items-end gap-2">
                          {tier.originalPrice && (
                            <span className={`text-base font-bold line-through decoration-2 ${tier.highlighted ? 'text-white/40' : 'text-slate-400'}`}>
                              {tier.originalPrice}
                            </span>
                          )}
                          <span className={`text-3xl font-black leading-none tracking-tight lg:text-4xl ${tier.highlighted ? 'text-white' : 'text-[#1e003a]'}`}>
                            {tier.price}
                          </span>
                        </div>

                        <div className="relative mb-6 flex min-h-[24px] flex-wrap items-center gap-2">
                          {tier.period && (
                            <span className={`text-xs font-bold ${tier.highlighted ? 'text-purple-200' : 'text-slate-400'}`}>{tier.period}</span>
                          )}
                          {tier.excludesVat && (
                            <span
                              className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                                tier.highlighted ? 'border border-purple-400/20 bg-purple-500/25 text-purple-200' : 'border border-slate-200/60 bg-slate-100 text-slate-500'
                              }`}
                            >
                              Excluding 13% VAT
                            </span>
                          )}
                        </div>

                        <p className={`relative mb-6 text-sm font-medium leading-relaxed ${tier.highlighted ? 'text-purple-100/90' : 'text-slate-500'}`}>
                          {tier.description}
                        </p>

                        <div className={`relative mb-6 h-px ${tier.highlighted ? 'bg-white/10' : 'bg-slate-100'}`} />

                        <ul className="relative mb-8 flex-1 space-y-3">
                          {tier.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5">
                              <span
                                className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
                                  tier.highlighted ? 'bg-[#a3e635]/20 text-[#a3e635]' : 'bg-purple-100 text-purple-600'
                                }`}
                              >
                                <CheckIcon className="h-3 w-3" />
                              </span>
                              <span className={`text-sm font-semibold leading-snug ${tier.highlighted ? 'text-white/90' : 'text-slate-600'}`}>{f}</span>
                            </li>
                          ))}
                        </ul>

                        <a
                          href={ctaHref}
                          target={external ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className={`relative flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black transition-all active:scale-[0.98] ${
                            tier.highlighted
                              ? 'bg-white text-[#3c2f80] shadow-lg shadow-black/20 hover:bg-slate-100'
                              : 'border border-purple-200 bg-purple-50 text-purple-700 hover:border-transparent hover:bg-linear-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white'
                          }`}
                        >
                          {tier.cta}
                          <ArrowRight />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ==== Why It Works ==== */}
              <section id="why-it-works" className="relative mb-28 scroll-mt-32">
                <div className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-96 w-3/4 -translate-x-1/2 rounded-full bg-linear-to-b from-purple-200/40 via-purple-100/20 to-transparent blur-3xl" />

                <SectionHeading
                  center
                  eyebrow="Why it works"
                  title="Engineered for speed, built for complete control"
                  subtitle={`See how ${activeProduct.name} keeps operations smooth, even at your busiest hours.`}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
                  {/* Fast */}
                  <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-purple-100 bg-linear-to-br from-white via-purple-50/40 to-purple-100/50 p-8 shadow-[0_10px_30px_rgba(147,51,234,0.05)] transition-all duration-300 hover:border-purple-300 hover:shadow-[0_20px_40px_rgba(147,51,234,0.12)] lg:col-span-7">
                    <div className="relative z-10 mb-8 max-w-md">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-110">
                        <BoltIcon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-2xl font-black text-slate-900">Fast and reliable</h3>
                      <p className="text-sm font-medium leading-relaxed text-slate-600">
                        No lag at peak hours. Every action syncs across all your devices the moment it happens.
                      </p>
                    </div>
                    <div className="relative z-10 rounded-2xl border border-purple-100/80 bg-white/90 p-5 shadow-md backdrop-blur-md">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                          </span>
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800">Sync speed</span>
                        </div>
                        <span className="rounded-md border border-purple-100 bg-purple-50 px-2.5 py-1 text-xs font-black text-purple-700">Near instant</span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[92%] rounded-full bg-linear-to-r from-purple-500 to-indigo-500 transition-all duration-1000 group-hover:w-full" />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-slate-400">
                        <span>Every device updated</span>
                        <span>Every change saved</span>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl" />
                  </div>

                  {/* Secure */}
                  <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.03)] transition-all duration-300 hover:border-purple-300 hover:shadow-[0_20px_40px_rgba(147,51,234,0.12)] lg:col-span-5">
                    <div>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-100 bg-purple-50 text-purple-600 transition-all group-hover:bg-purple-600 group-hover:text-white">
                        <LockIcon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-black text-slate-900">Role-based security</h3>
                      <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500">
                        Each person sees only what they need, which protects your revenue and your records.
                      </p>
                    </div>
                    <div className="space-y-2.5 rounded-2xl border border-purple-100/60 bg-purple-50/50 p-4">
                      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3.5 py-2 text-xs font-bold shadow-xs">
                        <span className="text-slate-700">Manager / Admin</span>
                        <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-600">Full access</span>
                      </div>
                      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-500">
                        <span>Staff</span>
                        <span className="rounded bg-purple-50 px-2 py-0.5 text-[10px] font-black uppercase text-purple-600">Their pages only</span>
                      </div>
                    </div>
                  </div>

                  {/* Live */}
                  <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.03)] transition-all duration-300 hover:border-purple-300 hover:shadow-[0_20px_40px_rgba(147,51,234,0.12)] lg:col-span-5">
                    <div>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-100 bg-purple-50 text-purple-600 transition-all group-hover:bg-purple-600 group-hover:text-white">
                        <ChartIcon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-black text-slate-900">Live numbers, anywhere</h3>
                      <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500">
                        Check how the day is going from any device, without waiting for a report.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-linear-to-r from-purple-700 to-indigo-700 p-4 text-white shadow-lg">
                      <div className="mb-1 text-[10px] font-extrabold uppercase tracking-widest text-purple-200">
                        {DASH_STATS[activeProduct.id]?.[0]?.[0] || 'Today'}
                      </div>
                      <div className="flex items-center justify-between text-2xl font-black tracking-tight">
                        <span>{DASH_STATS[activeProduct.id]?.[0]?.[1] || 'NPR 84,250'}</span>
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/20 px-2 py-0.5 text-xs font-bold text-emerald-200">+18.4%</span>
                      </div>
                    </div>
                  </div>

                  {/* Scale */}
                  <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-linear-to-br from-white via-purple-50/30 to-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.03)] transition-all duration-300 hover:border-purple-300 hover:shadow-[0_20px_40px_rgba(147,51,234,0.12)] lg:col-span-7">
                    <div className="relative z-10 mb-6 max-w-md">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-100 bg-purple-50 text-purple-600 transition-all group-hover:bg-purple-600 group-hover:text-white">
                        <ScaleIcon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-2xl font-black text-slate-900">Grows with your business</h3>
                      <p className="text-sm font-medium leading-relaxed text-slate-500">
                        Start with one location today and add more later, without moving data or retraining staff.
                      </p>
                    </div>
                    <div className="relative z-10 grid gap-3 sm:grid-cols-3">
                      {[
                        ['Butwal', 'Active', true],
                        ['Kathmandu', 'Synced', false],
                        ['Pokhara', 'Synced', false],
                      ].map(([city, status, active]) => (
                        <div
                          key={city as string}
                          className={`flex items-center gap-3 rounded-xl p-3 ${active ? 'border border-purple-200 bg-white shadow-xs' : 'border border-slate-100 bg-slate-50/80'}`}
                        >
                          <span className={`h-3 w-3 rounded-full ${active ? 'bg-purple-600' : 'bg-slate-300'}`} />
                          <div>
                            <div className={`text-xs ${active ? 'font-black text-slate-800' : 'font-bold text-slate-500'}`}>{city}</div>
                            <div className={`text-[10px] font-bold ${active ? 'text-emerald-600' : 'text-slate-400'}`}>{status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ==== Get started ==== */}
              <section
                id="get-started"
                className="relative overflow-hidden rounded-[32px] border border-purple-500/30 bg-linear-to-br from-[#1e003a] via-[#2d0a52] to-[#3b1266] p-8 shadow-2xl shadow-purple-950/30 sm:p-12 lg:p-16"
              >
                <div className="pointer-events-none absolute right-0 top-0 -mr-12 -mt-12 h-96 w-96 rounded-full bg-[#9333EA]/25 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 -mb-12 -ml-12 h-96 w-96 rounded-full bg-[#a3e635]/10 blur-3xl" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '26px 26px' }}
                />

                <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
                  <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#a3e635] backdrop-blur-md">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#a3e635]" />
                    {isComingSoon ? 'Launching soon' : 'Start risk-free today'}
                  </span>

                  <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {isComingSoon ? `Be first to try ${activeProduct.name}` : 'Ready to make work easier?'}
                  </h2>

                  <p className="mb-8 max-w-xl text-sm font-medium leading-relaxed text-purple-100/80 sm:text-base lg:text-lg">
                    {isComingSoon ? (
                      <>Leave your email and we will tell you the day it goes live.</>
                    ) : (
                      <>
                        Start with <span className="font-black text-white underline decoration-purple-400 decoration-2 underline-offset-4">{activeProduct.name}</span> today and make service smoother for your team and customers.
                      </>
                    )}
                  </p>

                  <div className="mb-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
                    <a
                      href={primaryHref}
                      target={isComingSoon ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-black text-[#1e003a] shadow-xl shadow-black/20 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100 active:scale-[0.98] sm:w-auto"
                    >
                      {isComingSoon ? 'Notify me at launch' : `Start your ${trialLabel}`}
                      <ArrowRight />
                    </a>
                    <a
                      href={demoHref}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 sm:w-auto"
                    >
                      <MailIcon />
                      Book a live demo
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-purple-200/90">
                    {['No credit card required', 'Quick setup', 'Cancel anytime'].map((perk) => (
                      <div key={perk} className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-[#a3e635]" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <Footer />
          </div>
        </div>
      )}
    </main>
  );
}