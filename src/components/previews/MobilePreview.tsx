/**
 * A miniature mobile website layout, sized for the phone frame in the hero.
 * Like SitePreview it is drawn entirely in CSS and scales with its container,
 * and it is decorative only.
 */
export function MobileSitePreview() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[9/19] w-full overflow-hidden bg-[#17120f] [container-type:inline-size]"
    >
      {/* App bar */}
      <div className="flex items-center justify-between px-[6cqw] pb-[3cqw] pt-[9cqw]">
        <span className="text-[6.5cqw] font-extrabold tracking-[-0.02em] text-[#f6efe7]">
          MAIDA
        </span>
        <span className="flex flex-col gap-[1.4cqw]">
          <span className="block h-[0.9cqw] w-[6cqw] rounded-full bg-[#a89787]" />
          <span className="block h-[0.9cqw] w-[6cqw] rounded-full bg-[#a89787]" />
          <span className="block h-[0.9cqw] w-[4cqw] rounded-full bg-[#a89787]" />
        </span>
      </div>

      {/* Hero image with overlaid headline */}
      <div className="relative mx-[5cqw] mt-[2cqw] h-[46cqw] overflow-hidden rounded-[4cqw] bg-[linear-gradient(140deg,#4a3527,#7c5638_55%,#c08b2c)]">
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75),transparent)] p-[5cqw]">
          <div className="text-[9cqw] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">
            Charcoal
            <br />
            grill.
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-[4cqw] flex gap-[3cqw] px-[5cqw]">
        <span className="flex-1 rounded-full bg-[#d9a441] py-[3cqw] text-center text-[4.4cqw] font-bold text-[#17120f]">
          Book a Table
        </span>
        <span className="rounded-full border-[0.5cqw] border-[#312720] px-[5cqw] py-[3cqw] text-center text-[4.4cqw] font-bold text-[#f6efe7]">
          Menu
        </span>
      </div>

      {/* Menu list */}
      <div className="mt-[5cqw] px-[5cqw]">
        <div className="text-[4cqw] font-bold uppercase tracking-[0.16em] text-[#d9a441]">
          Popular
        </div>
        <div className="mt-[3cqw] flex flex-col gap-[3cqw]">
          {[
            ["Mixed Grill", "4.500"],
            ["Saffron Rice", "2.750"],
            ["Sea Bass", "5.250"],
          ].map(([dish, price]) => (
            <div key={dish} className="flex items-center gap-[3cqw]">
              <span className="size-[11cqw] shrink-0 rounded-[2.5cqw] bg-[linear-gradient(135deg,#4a3527,#7c5638_60%,#c08b2c)]" />
              <span className="flex-1">
                <span className="block text-[4.6cqw] font-bold text-[#f6efe7]">
                  {dish}
                </span>
                <span className="mt-[0.8cqw] block text-[4cqw] text-[#a89787]">
                  KD {price}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky contact bar */}
      <div className="absolute inset-x-0 bottom-0 flex gap-[3cqw] border-t-[0.4cqw] border-[#312720] bg-[#211a16]/95 px-[5cqw] py-[4cqw]">
        <span className="flex-1 rounded-full bg-[#12823f] py-[2.8cqw] text-center text-[4.2cqw] font-bold text-white">
          WhatsApp
        </span>
        <span className="flex-1 rounded-full border-[0.5cqw] border-[#312720] py-[2.8cqw] text-center text-[4.2cqw] font-bold text-[#f6efe7]">
          Call
        </span>
      </div>
    </div>
  );
}
