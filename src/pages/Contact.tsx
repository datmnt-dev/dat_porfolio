import React from "react";
import PageHero from "../components/ui/PageHero";
import Contact from "../components/Contact";

const ContactPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="Get In Touch"
        title={
          <>
            Kết nối & <span className="text-gradient">Gửi lời nhắn</span>
          </>
        }
        subtitle="Để lại lời nhắn hợp tác qua form liên hệ đồ họa hoặc sử dụng giao diện dòng lệnh CLI."
      />
      <div className="pb-12">
        <Contact />
      </div>
    </div>
  );
};

export default ContactPage;
