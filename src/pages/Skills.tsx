import React from "react";
import PageHero from "../components/ui/PageHero";
import Skills from "../components/Skills";

const SkillsPage = () => {
  return (
    <div>
      <PageHero
        eyebrow="My Stack"
        title={
          <>
            Công nghệ & <span className="text-gradient">Kỹ năng lập trình</span>
          </>
        }
        subtitle="Hệ thống stack kỹ năng từ frontend đến backend và các công cụ bổ trợ tôi làm việc hàng ngày."
      />
      <div className="pb-12">
        <Skills />
      </div>
    </div>
  );
};

export default SkillsPage;
