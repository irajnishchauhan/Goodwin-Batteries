from reportlab.pdfgen import canvas
import os

products = [
    ("gw-tz4lb-datasheet.pdf", "GW-TZ4LB"),
    ("gw-xl5lb-datasheet.pdf", "GW-XL5LB"),
    ("gw-xl2-5lc-datasheet.pdf", "GW-XL2.5LC"),
    ("gw-tz5lb-datasheet.pdf", "GW-TZ5LB")
]

for filename, name in products:
    c = canvas.Canvas(f"public/assets/datasheets/{filename}")
    c.setFont("Helvetica-Bold", 24)
    c.drawString(100, 750, f"Datasheet: {name}")
    c.setFont("Helvetica", 14)
    c.drawString(100, 700, "Goodwin Batteries Premium Automotive Series")
    c.drawString(100, 650, "Technical Specifications:")
    c.drawString(120, 620, "- Maintenance Free (SMF)")
    c.drawString(120, 590, "- Advanced Lead Acid Technology")
    c.drawString(120, 560, "- High Cranking Power")
    c.drawString(100, 500, "For more information, please visit www.goodwinbatteries.com")
    c.save()

print("PDFs generated!")
