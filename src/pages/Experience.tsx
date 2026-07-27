import React from "react";
import PageHero from "../components/ui/PageHero";
import EducationAndExperience from "../components/EducationAndEperience";

const ExperiencePage = () => {
  return (
    <div>
      <PageHero
        eyebrow="My Journey"
        title={
          <>
            Học vấn & <span className="text-gradient">Kinh nghiệm thực tế</span>
          </>
        }
        subtitle="Timeline hoạt động mô phỏng nhánh Git để tracking các cột mốc học tập và làm việc."
      />
      <div className="pb-12">
        <EducationAndExperience />
      </div>
    </div>
  );
};

export default ExperiencePage;
