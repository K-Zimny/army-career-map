"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ComponentWrapper from "../componentwrapper/ComponentWrapper";
import Eyebrow from "../eyebrow/Eyebrow";

const mockData = [
  {
    topic: "Infantryman Role",
    information:
      "As an Infantryman, you are the backbone of the Army's ground forces, trained to defend the nation and engage enemy forces during combat.",
    url: "https://www.goarmy.com/careers-and-jobs/career-match/ground-forces/infantry/infantryman.html",
  },
  {
    topic: "Sergeant Responsibilities",
    information:
      "As a Sergeant, you lead and mentor junior soldiers, oversee their training, and ensure the maintenance of equipment and supplies.",
    url: "https://www.goarmy.com/army-life/intro-to-army-life/daily-routine/enlisted-sergeant",
  },
  {
    topic: "Expert Infantryman Badge",
    information:
      "Earning the Expert Infantryman Badge signifies mastery of critical infantry skills, demonstrating your proficiency and dedication to excellence.",
    url: "https://www.goarmy.com/careers-and-jobs/career-match/ground-forces/infantry/infantryman.html#training",
  },
  {
    topic: "Leadership Training",
    information:
      "The Army offers leadership courses designed to enhance your tactical and operational skills, preparing you for greater responsibilities.",
    url: "https://www.goarmy.com/careers-and-jobs/career-match/ground-forces/infantry/infantryman.html#career-path",
  },
  {
    topic: "Overseas Deployments",
    information:
      "Deploying overseas provides invaluable experience, exposing you to diverse environments and strengthening your combat readiness.",
    url: "https://www.goarmy.com/army-life/intro-to-army-life/daily-routine/enlisted-sergeant",
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
      setDetailsList(data.slice(0, 3));
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
          <Eyebrow type="bigger">Search Results</Eyebrow>
          <div className="space-y-6">
            {detailsList.map((item, index) => (
              <div key={index}>
                <Eyebrow>{item.topic}</Eyebrow>
                <p className="text-sm mt-2">{item.information}</p>
                {/* Optional: Show source link */}
                <p className="mt-2 text-xs text-gray-500">Source: {item.url}</p>
              </div>
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
