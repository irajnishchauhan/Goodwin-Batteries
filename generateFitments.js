const fs = require('fs');

const fitments = [];

function addFitment(type, brand, model, variants, batteryModel, batteryId, status = "verified") {
  variants.forEach(variant => {
    fitments.push({
      id: `${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, '-')}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      type,
      brand,
      model,
      variant,
      fuel: ["Ola Electric", "Ather", "Hero Electric", "TVS iQube", "Revolt", "Ultraviolette"].includes(brand) || model.includes("Chetak") ? "Electric" : "Petrol",
      yearFrom: 2010,
      yearTo: 2025,
      batteryModel: batteryModel,
      batteryProductId: batteryId,
      verificationStatus: status,
      source: "Goodwin",
      notes: ""
    });
  });
}

// MOTORCYCLES - HERO
addFitment("Motorcycle", "Hero", "Splendor Plus", ["Kick Start", "Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Hero", "Splendor Plus XTEC", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Hero", "HF Deluxe", ["Kick Start", "Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Hero", "Passion Pro", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Hero", "Glamour", ["Self Start", "Disc"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Hero", "Glamour XTEC", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Hero", "Super Splendor", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Hero", "Xtreme 160R", ["Self Start"], "GW-TZ5LB", "prod-tz5lb", "verified");
addFitment("Motorcycle", "Hero", "Xpulse 200", ["Self Start"], "GW-TZ5LB", "prod-tz5lb", "verified");
addFitment("Motorcycle", "Hero", "Xpulse 200 4V", ["Self Start"], "GW-TZ5LB", "prod-tz5lb", "verified");

// MOTORCYCLES - HONDA
addFitment("Motorcycle", "Honda", "Shine", ["Self Start", "Disc"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Honda", "Shine 100", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Honda", "SP 125", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Honda", "Unicorn", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Honda", "Hornet 2.0", ["Self Start"], "GW-TZ5LB", "prod-tz5lb", "verified");

// MOTORCYCLES - TVS
addFitment("Motorcycle", "TVS", "Sport", ["Kick Start", "Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "TVS", "Radeon", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "TVS", "Star City Plus", ["Self Start"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "TVS", "Apache RTR 160", ["Self Start"], "GW-XL5LB", "prod-xl5lb", "verified");
addFitment("Motorcycle", "TVS", "Apache RTR 160 4V", ["Self Start"], "GW-XL5LB", "prod-xl5lb", "verified");
addFitment("Motorcycle", "TVS", "Apache RTR 200 4V", ["Self Start"], "GW-XL5LB", "prod-xl5lb", "verified");

// MOTORCYCLES - BAJAJ
addFitment("Motorcycle", "Bajaj", "Platina 100", ["Kick Start", "Self Start"], "GW-XL2.5LC", "prod-xl25lc", "verified");
addFitment("Motorcycle", "Bajaj", "CT 100", ["Kick Start"], "GW-XL2.5LC", "prod-xl25lc", "verified");
addFitment("Motorcycle", "Bajaj", "Pulsar 150", ["Standard", "Twin Disc"], "GW-XL5LB", "prod-xl5lb", "verified");
addFitment("Motorcycle", "Bajaj", "Pulsar NS160", ["Standard"], "GW-XL5LB", "prod-xl5lb", "verified");
addFitment("Motorcycle", "Bajaj", "Pulsar NS200", ["Standard"], "GW-XL5LB", "prod-xl5lb", "verified");
addFitment("Motorcycle", "Bajaj", "Dominar 400", ["Standard"], null, null, "unverified"); 

// MOTORCYCLES - YAMAHA
addFitment("Motorcycle", "Yamaha", "FZS-FI", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Yamaha", "MT-15", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Motorcycle", "Yamaha", "R15", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");

// MOTORCYCLES - ROYAL ENFIELD (usually 14Ah, unverified in 2-wheeler range)
addFitment("Motorcycle", "Royal Enfield", "Classic 350", ["Standard"], null, null, "unverified");
addFitment("Motorcycle", "Royal Enfield", "Meteor 350", ["Standard"], null, null, "unverified");

// SCOOTERS - HONDA
addFitment("Scooter", "Honda", "Activa 6G", ["Standard", "Premium"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Scooter", "Honda", "Activa 125", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Scooter", "Honda", "Dio", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");

// SCOOTERS - TVS
addFitment("Scooter", "TVS", "Jupiter", ["Standard", "ZX"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Scooter", "TVS", "Jupiter 125", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Scooter", "TVS", "NTORQ 125", ["Standard", "Race Edition"], "GW-TZ4LB", "prod-tz4lb", "verified");

// SCOOTERS - SUZUKI
addFitment("Scooter", "Suzuki", "Access 125", ["Standard", "Ride Connect"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Scooter", "Suzuki", "Burgman Street", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Scooter", "Suzuki", "Avenis", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");

// SCOOTERS - YAMAHA
addFitment("Scooter", "Yamaha", "Fascino 125", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");
addFitment("Scooter", "Yamaha", "RayZR 125", ["Standard"], "GW-TZ4LB", "prod-tz4lb", "verified");

// ELECTRIC (Unverified 12V auxiliary)
addFitment("Scooter", "Ola Electric", "S1 Pro", ["Standard"], null, null, "unverified");
addFitment("Scooter", "Ather", "450X", ["Standard"], null, null, "unverified");
addFitment("Scooter", "Bajaj", "Chetak", ["Premium"], null, null, "unverified");

fs.writeFileSync('data/vehicleFitments.json', JSON.stringify(fitments, null, 2));
console.log('Done');
