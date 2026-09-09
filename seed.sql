-- ==============================================================================================
-- GOODWIN BATTERIES - SEED DATA
-- Execute this in the Supabase SQL Editor AFTER running schema.sql
-- ==============================================================================================

-- Categories
INSERT INTO categories (id, name, slug, description, image, display_order) VALUES
('cat-1', 'Passenger Vehicles', 'passenger-vehicles', 'Reliable starting power for demanding journeys.', '/assets/products/goodwin-12gw-xl2-5lc.png', 1),
('cat-2', 'Two Wheelers', 'two-wheelers', 'Quick starts and consistent performance for bikes and scooters.', '/assets/products/goodwin-12vgw-tz4lb.png', 2),
('cat-3', 'Commercial Vehicles', 'commercial-vehicles', 'Heavy-duty power for trucks and commercial transport.', '/assets/products/goodwin-12sv-xl2-5lc-side.png', 3),
('cat-4', 'Tractors', 'tractors', 'Built for tough agricultural environments.', '/assets/products/goodwin-12vgw-xl5lb.png', 4),
('cat-5', 'Three Wheelers', 'three-wheelers', 'Dependable energy for continuous city driving.', '/assets/products/goodwin-4smf5-torch-4v-5ah.png', 5),
('cat-6', 'Industrial & UPS', 'industrial', 'High-capacity power for stationary and industrial use.', '/assets/products/goodwin-12smf8-ups-12v-8ah.png', 6)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, image = EXCLUDED.image;

-- Products
INSERT INTO products (id, name, slug, series, category_id, voltage, ah, cca, warranty, image, description, features, terminal_layout, dimensions, weight, display_order, is_published) VALUES
('prod-1', 'Goodwin ProStart 45', 'goodwin-prostart-45', 'ProStart', 'cat-1', '12V', '45 Ah', '380', '60 Months', '/assets/products/goodwin-12gw-xl2-5lc.png', 'Premium maintenance-free battery designed for modern cars with high electrical loads.', ARRAY['Maintenance-free design', 'High cranking power', 'Vibration resistant', 'Built for Indian conditions'], 'Standard', '238 x 129 x 227 mm', '12.5 kg', 1, true),
('prod-2', 'Goodwin DuraMax 65', 'goodwin-duramax-65', 'DuraMax', 'cat-1', '12V', '65 Ah', '550', '48 Months', '/assets/products/goodwin-12sv-xl2-5lc-side.png', 'Heavy-duty battery built to withstand rough terrains and high vibrations.', ARRAY['Extra thick plates', 'Heat resistant', 'Longer life cycle'], 'Standard SUV', '260 x 173 x 225 mm', '16.2 kg', 2, true),
('prod-3', 'Goodwin Rider 5Ah', 'goodwin-rider-5ah', 'Rider', 'cat-2', '12V', '5 Ah', '80', '48 Months', '/assets/products/goodwin-12vgw-tz4lb.png', 'Reliable VRLA battery for quick starts in all weather conditions.', ARRAY['Spill-proof', 'VRLA technology', 'Quick recharge'], 'Standard Two-Wheeler', '113 x 70 x 105 mm', '1.8 kg', 3, true),
('prod-4', 'Goodwin Haulage 150', 'goodwin-haulage-150', 'Haulage', 'cat-3', '12V', '150 Ah', '900', '36 Months', '/assets/products/goodwin-12vgw-xl5lb.png', 'Extreme heavy-duty battery built to withstand the rigorous demands of commercial transport.', ARRAY['Thick plate construction', 'High reserve capacity', 'Extreme vibration resistance'], 'Standard Commercial', '510 x 220 x 230 mm', '42.0 kg', 4, true)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, image = EXCLUDED.image;

-- Vehicle Types
INSERT INTO vehicle_types (id, name, display_order) VALUES
('vt-1', 'Passenger Cars', 1),
('vt-2', 'Two Wheelers', 2),
('vt-3', 'Commercial', 3),
('vt-4', 'Tractors', 4)
ON CONFLICT (id) DO NOTHING;

-- Manufacturers
INSERT INTO manufacturers (id, name, vehicle_type_id, display_order) VALUES
('m-1', 'Maruti Suzuki', 'vt-1', 1),
('m-2', 'Hyundai', 'vt-1', 2),
('m-3', 'Mahindra', 'vt-1', 3),
('m-4', 'Honda', 'vt-2', 4),
('m-5', 'Bajaj', 'vt-2', 5),
('m-6', 'Tata Motors', 'vt-3', 6)
ON CONFLICT (id) DO NOTHING;

-- Vehicle Models
INSERT INTO vehicle_models (id, name, manufacturer_id, display_order) VALUES
('vm-1', 'Swift', 'm-1', 1),
('vm-2', 'Creta', 'm-2', 2),
('vm-3', 'Activa', 'm-4', 3),
('vm-4', 'Signa', 'm-6', 4),
('vm-5', 'Scorpio', 'm-3', 5)
ON CONFLICT (id) DO NOTHING;

-- Vehicle Variants
INSERT INTO vehicle_variants (id, name, model_id, fuel_type, year_range, recommended_battery_id, display_order) VALUES
('vv-1', '1.2L LXI', 'vm-1', 'Petrol', '2018-Present', 'prod-1', 1),
('vv-2', '1.3L VDI', 'vm-1', 'Diesel', '2010-2018', 'prod-2', 2),
('vv-3', '1.5L CRDi', 'vm-2', 'Diesel', '2020-Present', 'prod-2', 3),
('vv-4', '1.5L MPi', 'vm-2', 'Petrol', '2020-Present', 'prod-1', 4),
('vv-5', '110cc', 'vm-3', 'Petrol', 'All Years', 'prod-3', 5),
('vv-6', '4018.S', 'vm-4', 'Diesel', 'All Years', 'prod-4', 6)
ON CONFLICT (id) DO NOTHING;

-- Dealers
INSERT INTO dealers (id, name, address, city, state, pincode, phone, opening_hours, latitude, longitude, is_published) VALUES
('d-1', 'Sharma Battery Point', '12/4, Main Ring Road, Pitampura', 'New Delhi', 'Delhi', '110034', '9811234567', 'Mon - Sat: 9AM - 8PM', 28.7032, 77.1473, true),
('d-2', 'Power Tech Auto', 'Shop 5, Auto Market, Sector 14', 'Gurugram', 'Haryana', '122001', '9876543210', 'Mon - Sun: 10AM - 7PM', 28.4595, 77.0266, true),
('d-3', 'Rao Battery Agency', 'Main Bazar, Near Bus Stand', 'Jaipur', 'Rajasthan', '302001', '8899776655', 'Mon - Sat: 9:30AM - 7:30PM', 26.9124, 75.7873, true)
ON CONFLICT (id) DO NOTHING;

-- Applications (Homepage / "Power for Every Application")
INSERT INTO applications (id, name, description, image, icon, display_order, is_published) VALUES
('app-1', 'Passenger Vehicles', 'Reliable starting power for daily commutes and family trips. Advanced maintenance-free technology.', '/assets/products/goodwin-12gw-xl2-5lc.png', 'Car', 1, true),
('app-2', 'Two Wheelers', 'Spill-proof, high-cranking VRLA batteries designed for Indian roads and traffic conditions.', '/assets/products/goodwin-12vgw-tz4lb.png', 'Bike', 2, true),
('app-3', 'Commercial Heavy Duty', 'Built tough to withstand extreme vibrations and high temperatures during long hauls.', '/assets/products/goodwin-12sv-xl2-5lc-side.png', 'Truck', 3, true),
('app-4', 'Agricultural & Tractors', 'Rugged performance for off-road environments ensuring continuous agricultural operations.', '/assets/products/goodwin-12vgw-xl5lb.png', 'Tractor', 4, true)
ON CONFLICT (id) DO NOTHING;
