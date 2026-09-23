import React, { useState, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setSent(false);
    }, 4000);
  };

  const fontFamily = '"Jost", "Outfit", "Century Gothic", -apple-system, sans-serif';

  return (
    <div className="w-full bg-white flex flex-col items-center">
      {/* ── Top Cream Header Banner ── */}
      <section
        className="w-full bg-[#F7F6F0] flex flex-col items-center justify-center"
        style={{
          paddingTop: '70px',
          paddingBottom: '70px',
          minHeight: '240px',
        }}
      >
        <h1
          className="text-4xl sm:text-5xl md:text-[62px] font-normal tracking-tight text-[#233B33] text-center leading-none"
          style={{ fontFamily }}
        >
          Contact Us
        </h1>
      </section>

      {/* ── Main White Content Card Overlapping the Banner ── */}
      <section className="w-full max-w-[1100px] px-4 sm:px-6 -mt-[88px] z-10 mb-20 sm:mb-28">
        <div
          className="bg-white w-full shadow-none"
          style={{
            paddingTop: '55px',
            paddingBottom: '70px',
            paddingLeft: '48px',
            paddingRight: '48px',
          }}
        >
          {/* ── Two-Column Grid: Info Left | Form Right ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {/* ── LEFT: Information ── */}
            <div className="w-full">
              <h2
                className="text-[22px] sm:text-[24px] font-normal tracking-[-0.01em] text-[#233B33] leading-tight"
                style={{ fontFamily, marginBottom: '28px' }}
              >
                Information
              </h2>

              <div className="w-full flex flex-col">
                {/* Name */}
                <div
                  className="w-full flex flex-row justify-between items-start py-9"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  <span className="text-[14.5px] font-light text-[#3F524A]" style={{ fontFamily }}>
                    Name
                  </span>
                  <span className="text-[14.5px] font-normal text-[#233B33] text-right" style={{ fontFamily }}>
                    Barbaranne Hill-Irving
                  </span>
                </div>

                {/* Address */}
                <div
                  className="w-full flex flex-row justify-between items-start py-9"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  <span className="text-[14.5px] font-light text-[#3F524A] shrink-0" style={{ fontFamily }}>
                    Address
                  </span>
                  <span className="text-[14.5px] font-normal text-[#233B33] text-right leading-[2]" style={{ fontFamily }}>
                    125 Indian Rocks Road<br />
                    North Suite 200<br />
                    Belleair Bluffs, FL 33770
                  </span>
                </div>

                {/* Cell */}
                <div
                  className="w-full flex flex-row justify-between items-center py-9"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  <span className="text-[14.5px] font-light text-[#3F524A]" style={{ fontFamily }}>
                    Cell
                  </span>
                  <a href="tel:513-319-0581" className="text-[14.5px] font-normal text-[#233B33] hover:text-[#B87E58] transition-colors" style={{ fontFamily }}>
                    513-319-0581
                  </a>
                </div>

                {/* Work Phone */}
                <div
                  className="w-full flex flex-row justify-between items-center py-9"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  <span className="text-[14.5px] font-light text-[#3F524A]" style={{ fontFamily }}>
                    Work Phone
                  </span>
                  <a href="tel:727-461-1700" className="text-[14.5px] font-normal text-[#233B33] hover:text-[#B87E58] transition-colors" style={{ fontFamily }}>
                    727-461-1700
                  </a>
                </div>

                {/* Direct Line */}
                <div
                  className="w-full flex flex-row justify-between items-center py-9"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  <span className="text-[14.5px] font-light text-[#3F524A]" style={{ fontFamily }}>
                    Direct Line
                  </span>
                  <a href="tel:513-319-0581" className="text-[14.5px] font-normal text-[#233B33] hover:text-[#B87E58] transition-colors" style={{ fontFamily }}>
                    513-319-0581
                  </a>
                </div>

                {/* Designation */}
                <div
                  className="w-full flex flex-col py-9"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  <span className="text-[14.5px] font-light text-[#3F524A]" style={{ fontFamily, marginBottom: '8px' }}>
                    Designation
                  </span>
                  <span className="text-[15px] font-normal text-[#233B33] leading-[1.9]" style={{ fontFamily }}>
                    CNHS - Certified New Home Specialist,<br />
                    REALTOR®®
                  </span>
                </div>

                {/* Languages */}
                <div
                  className="w-full flex flex-row justify-between items-center py-9"
                  style={{ borderBottom: '1px solid #E5E7EB' }}
                >
                  <span className="text-[14.5px] font-light text-[#3F524A]" style={{ fontFamily }}>
                    Languages
                  </span>
                  <span className="text-[14.5px] font-normal text-[#233B33]" style={{ fontFamily }}>
                    English
                  </span>
                </div>

                {/* E-mail Me */}
                <div className="w-full py-9">
                  <a
                    href="mailto:barbaranne@bfrealtygroup.com"
                    className="text-[14.5px] font-light text-[#B87E58] hover:text-[#233B33] transition-colors"
                    style={{ fontFamily }}
                  >
                    E-mail Me
                  </a>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Contact Form ── */}
            <div className="w-full">
              <h2
                className="text-[22px] sm:text-[24px] font-normal tracking-[-0.01em] text-[#233B33] leading-tight"
                style={{ fontFamily, marginBottom: '8px' }}
              >
                Send a Message
              </h2>
              <p
                className="text-[12.5px] font-light text-[#3F524A]"
                style={{ fontFamily, marginBottom: '36px' }}
              >
                Have a question or want to schedule a consultation? Fill out the form below.
              </p>

              {sent && (
                <div className="mb-8 w-full border border-[#B87E58] bg-[#FAF9F5] p-4 text-center text-sm text-[#233B33]">
                  Thank you! Your message has been sent to Barbaranne Hill-Irving.
                </div>
              )}

              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <div
                  className="grid grid-cols-1 gap-7 sm:grid-cols-2 text-left"
                  style={{ marginBottom: '36px' }}
                >
                  <div>
                    <label
                      htmlFor="contactFirstName"
                      className="mb-2 block text-[11.5px] font-light tracking-[0.04em] text-[#3F524A]"
                      style={{ fontFamily }}
                    >
                      First Name *
                    </label>
                    <Input
                      id="contactFirstName"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="rounded-none border-0 border-b border-[#233B33] bg-transparent px-0 py-2 text-xs text-[#233B33] focus-visible:border-[#B87E58] focus-visible:outline-none focus:ring-0 shadow-none"
                      style={{ fontFamily }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contactLastName"
                      className="mb-2 block text-[11.5px] font-light tracking-[0.04em] text-[#3F524A]"
                      style={{ fontFamily }}
                    >
                      Last Name *
                    </label>
                    <Input
                      id="contactLastName"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="rounded-none border-0 border-b border-[#233B33] bg-transparent px-0 py-2 text-xs text-[#233B33] focus-visible:border-[#B87E58] focus-visible:outline-none focus:ring-0 shadow-none"
                      style={{ fontFamily }}
                    />
                  </div>
                </div>

                <div className="text-left" style={{ marginBottom: '36px' }}>
                  <label
                    htmlFor="contactEmail"
                    className="mb-2 block text-[11.5px] font-light tracking-[0.04em] text-[#3F524A]"
                    style={{ fontFamily }}
                  >
                    Email *
                  </label>
                  <Input
                    id="contactEmail"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="rounded-none border-0 border-b border-[#233B33] bg-transparent px-0 py-2 text-xs text-[#233B33] focus-visible:border-[#B87E58] focus-visible:outline-none focus:ring-0 shadow-none"
                    style={{ fontFamily }}
                  />
                </div>

                <div className="text-left" style={{ marginBottom: '44px' }}>
                  <label
                    htmlFor="contactMessage"
                    className="mb-2 block text-[11.5px] font-light tracking-[0.04em] text-[#3F524A]"
                    style={{ fontFamily }}
                  >
                    Message
                  </label>
                  <Textarea
                    id="contactMessage"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="rounded-none border-0 border-b border-[#233B33] bg-transparent px-0 py-2 text-xs text-[#233B33] focus-visible:border-[#B87E58] focus-visible:outline-none focus:ring-0 shadow-none resize-none min-h-[100px]"
                    style={{ fontFamily }}
                  />
                </div>

                <div className="flex justify-center items-center w-full">
                  <button
                    type="submit"
                    className="border border-[#B87E58] bg-transparent text-[#233B33] transition-colors duration-300 hover:bg-[#B87E58] hover:text-white cursor-pointer inline-flex items-center justify-center"
                    style={{
                      fontFamily,
                      width: '184px',
                      height: '44px',
                      fontSize: '11px',
                      letterSpacing: '0.18em',
                      fontWeight: 400,
                      textTransform: 'uppercase',
                    }}
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
