"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ComponentWrapper from "../componentwrapper/ComponentWrapper";
import Eyebrow from "../eyebrow/Eyebrow";
import ArrowIconWhite from "@/assets/icons/arrow-white.svg";
import ArrowIconGold from "@/assets/icons/arrow-gold.svg";
import AccordionWrapper from "../accordionwrapper/AccordionWrapper";

const mockData = [
  {
    topic: "Comprehensive Army Benefits",
    information:
      "As a Soldier, you receive a robust benefits package, including up to 100% tuition coverage, low-cost health care, and up to $64K in your first year. Additional perks include up to $50K in bonuses and 30 paid days off annually.",
    url: "https://www.goarmy.com/benefits/while-you-serve",
  },
  {
    topic: "Diverse Career Opportunities",
    information:
      "With over 200 career fields, the Army offers roles in mechanics, engineering, science, medicine, signal intelligence, support, logistics, ground forces, aviation, and aerial defense, catering to various interests and skills.",
    url: "https://www.goarmy.com/careers-and-jobs.html",
  },
  {
    topic: "Educational Support",
    information:
      "The Army provides educational benefits like the GI Bill, covering tuition, housing stipends, and support for books and supplies, enabling you to pursue higher education with financial assistance.",
    url: "https://www.goarmy.com/benefits/while-you-serve/education-training/gi-bill",
  },
  {
    topic: "Family Support Programs",
    information:
      "Soldiers' families have access to high-quality, low-cost health care through TRICARE, along with housing allowances and family support services, ensuring comprehensive care for your loved ones.",
    url: "https://www.goarmy.com/benefits/family",
  },
  {
    topic: "Financial Planning Resources",
    information:
      "The Army offers financial planning resources, including tax deductions, savings accounts like the Thrift Savings Plan (TSP), and financial classes to help you manage your finances effectively.",
    url: "https://www.goarmy.com/benefits/while-you-serve/perks-incentives",
  },
];

export default function MoreDetails({ milestone }) {
  const isDev = true; // Set to false to use live AI web search

  const [detailsList, setDetailsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetails = async (milestone) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Raw milestone object:", milestone);
      const milestoneQuery = formatMilestoneForQuery(milestone);
      console.log("Formatted milestone query:", milestoneQuery);

      let data;

      if (!isDev) {
        const response = await fetch("/api/performWebSearch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: milestoneQuery }),
        });

        if (!response.ok) {
          const errorDetails = await response.json();
          console.error("More Details API Error Details:", errorDetails);
          throw new Error(
            errorDetails.error || "Failed to fetch additional details"
          );
        }

        const responseData = await response.json();
        console.log("Fetched More Details:", responseData.result);
        data = responseData.result; // Use result array
      } else {
        console.log("Using mock data with simulated delay");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second delay
        data = mockData;
      }

      // Only keep the first 3 items
      setDetailsList(data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching More Details:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatMilestoneForQuery = (milestone) => {
    if (!milestone || typeof milestone !== "object") {
      console.error("Invalid milestone object:", milestone);
      return "No milestone data available.";
    }

    const {
      year = "Unknown year",
      age = "Unknown age",
      rank = "Unknown rank",
      currentSalary = "Unknown salary",
      description = "No description available",
      achievements = [],
    } = milestone;

    const achievementsList = achievements.length
      ? achievements.join(", ")
      : "No achievements listed";

    return `Milestone: Year ${year}, Age ${age}, Rank ${rank}, Salary $${currentSalary}. Achievements: ${achievementsList}. Description: ${description}`;
  };

  useEffect(() => {
    if (milestone) {
      fetchDetails(milestone);
    }
  }, [milestone]);

  return (
    <div>
      {loading && (
        <ComponentWrapper>
          <h2 className="mb-4 text-md font-bold uppercase">
            Searching GOARMY for Resources
          </h2>
          <Image
            src="/loader.svg"
            alt="Loader"
            width={60}
            height={60}
            className="spinner-slow mt-8 mb-8 mx-auto"
            priority
          />
        </ComponentWrapper>
      )}
      {error ? (
        <ComponentWrapper>
          <p className="text-red-500">{error}</p>
        </ComponentWrapper>
      ) : detailsList.length > 0 ? (
        <ComponentWrapper>
          <h2 className="text-[27px] text-army-gold md:text-[36px]">
            Keep Exploring
          </h2>
          <div className="">
            {detailsList.map((item, index) => (
              <AccordionWrapper
                title={item.topic}
                key={index}
                className="!px-0 !py-2"
              >
                <div key={index}>
                  <p className="text-sm mt-2">{item.information}</p>

                  <div className="items-center inline-flex gap-[8px] self-center pr-2 group py-2 font-bold text-army-gold hover:text-army-white border-b-1 border-army-gold hover:border-army-white transition">
                    <a className="" href={item.url}>
                      Explore {item.topic}
                    </a>
                    <img
                      src={ArrowIconGold}
                      alt="Arrow Icon"
                      className="group-hover:hidden"
                    />
                    <img
                      src={ArrowIconWhite}
                      alt="Arrow Icon"
                      className="hidden group-hover:block"
                    />
                  </div>
                </div>
              </AccordionWrapper>
            ))}
          </div>
        </ComponentWrapper>
      ) : (
        !loading && (
          <ComponentWrapper>
            <p>No additional information available for this milestone.</p>
          </ComponentWrapper>
        )
      )}
    </div>
  );
}
