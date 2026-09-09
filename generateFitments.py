import json

fitments = []

def add_fitment(type_, brand, model, variants, battery_model, battery_id, status="verified"):
    for variant in variants:
        is_electric = brand in ["Ola Electric", "Ather", "Hero Electric", "TVS iQube", "Revolt", "Ultraviolette"] or "Chetak" in model
        fuel = "Electric" if is_electric else "Petrol"
        
        fitments.append({
            "id": f"{brand.lower()}-{model.lower().replace(' ', '-')}-{variant.lower().replace(' ', '-')}",
            "type": type_,
            "brand": brand,
            "model": model,
            "variant": variant,
            "fuel": fuel,
            "yearFrom": 2010,
            "yearTo": 2025,
            "batteryModel": battery_model,
            "batteryProductId": battery_id,
            "verificationStatus": status,
            "source": "Goodwin",
            "notes": ""
        })

# MOTORCYCLES - HERO
add_fitment("Motorcycle", "Hero", "Splendor Plus", ["Kick Start", "Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Hero", "Splendor Plus XTEC", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Hero", "HF Deluxe", ["Kick Start", "Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Hero", "Passion Pro", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Hero", "Glamour", ["Self Start", "Disc"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Hero", "Glamour XTEC", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Hero", "Super Splendor", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Hero", "Xtreme 160R", ["Self Start"], "GW-TZ5LB", "prod-tz5lb", "verified")
add_fitment("Motorcycle", "Hero", "Xpulse 200", ["Self Start"], "GW-TZ5LB", "prod-tz5lb", "verified")
add_fitment("Motorcycle", "Hero", "Xpulse 200 4V", ["Self Start"], "GW-TZ5LB", "prod-tz5lb", "verified")

# MOTORCYCLES - HONDA
add_fitment("Motorcycle", "Honda", "Shine", ["Self Start", "Disc"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Honda", "Shine 100", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Honda", "SP 125", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Honda", "Unicorn", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Honda", "Hornet 2.0", ["Self Start"], "GW-TZ5LB", "prod-tz5lb", "verified")

# MOTORCYCLES - TVS
add_fitment("Motorcycle", "TVS", "Sport", ["Kick Start", "Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "TVS", "Radeon", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "TVS", "Star City Plus", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "TVS", "Apache RTR 160", ["Self Start"], "GW-XL5LB", "prod-xl5lb", "verified")
add_fitment("Motorcycle", "TVS", "Apache RTR 160 4V", ["Self Start"], "GW-XL5LB", "prod-xl5lb", "verified")
add_fitment("Motorcycle", "TVS", "Apache RTR 200 4V", ["Self Start"], "GW-XL5LB", "prod-xl5lb", "verified")

# MOTORCYCLES - BAJAJ
add_fitment("Motorcycle", "Bajaj", "Platina 100", ["Kick Start", "Self Start"], "GW-XL2.5LC", "prod-xl25lc", "verified")
add_fitment("Motorcycle", "Bajaj", "CT 100", ["Kick Start"], "GW-XL2.5LC", "prod-xl25lc", "verified")
add_fitment("Motorcycle", "Bajaj", "Pulsar 150", ["Standard", "Twin Disc"], "GW-XL5LB", "prod-xl5lb", "verified")
add_fitment("Motorcycle", "Bajaj", "Pulsar NS160", ["Standard"], "GW-XL5LB", "prod-xl5lb", "verified")
add_fitment("Motorcycle", "Bajaj", "Pulsar NS200", ["Standard"], "GW-XL5LB", "prod-xl5lb", "verified")
add_fitment("Motorcycle", "Bajaj", "Dominar 400", ["Standard"], None, None, "unverified") 

# MOTORCYCLES - YAMAHA
add_fitment("Motorcycle", "Yamaha", "FZS-FI", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Yamaha", "MT-15", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Motorcycle", "Yamaha", "R15", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")

# MOTORCYCLES - ROYAL ENFIELD
add_fitment("Motorcycle", "Royal Enfield", "Classic 350", ["Standard"], None, None, "unverified")
add_fitment("Motorcycle", "Royal Enfield", "Meteor 350", ["Standard"], None, None, "unverified")

# SCOOTERS - HONDA
add_fitment("Scooter", "Honda", "Activa 6G", ["Standard", "Premium"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Scooter", "Honda", "Activa 125", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Scooter", "Honda", "Dio", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")

# SCOOTERS - TVS
add_fitment("Scooter", "TVS", "Jupiter", ["Standard", "ZX"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Scooter", "TVS", "Jupiter 125", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Scooter", "TVS", "NTORQ 125", ["Standard", "Race Edition"], "GW-TZ4LB", "prod-tz4lb", "verified")

# SCOOTERS - SUZUKI
add_fitment("Scooter", "Suzuki", "Access 125", ["Standard", "Ride Connect"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Scooter", "Suzuki", "Burgman Street", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Scooter", "Suzuki", "Avenis", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")

# SCOOTERS - YAMAHA
add_fitment("Scooter", "Yamaha", "Fascino 125", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")
add_fitment("Scooter", "Yamaha", "RayZR 125", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified")

# ELECTRIC (Unverified 12V auxiliary)
add_fitment("Scooter", "Ola Electric", "S1 Pro", ["Standard"], None, None, "unverified")
add_fitment("Scooter", "Ather", "450X", ["Standard"], None, None, "unverified")
add_fitment("Scooter", "Bajaj", "Chetak", ["Premium"], None, None, "unverified")

with open("data/vehicleFitments.json", "w") as f:
    json.dump(fitments, f, indent=2)

print("Successfully generated data/vehicleFitments.json")
