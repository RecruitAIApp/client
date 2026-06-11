import React, { useState } from "react";
import { Sparkles, Brain, Award, ShieldAlert, RefreshCw } from "lucide-react";
import { RecommendationOverview } from "./RecommendationOverview.jsx";
import { SkillGapCard } from "./SkillGapCard.jsx";
import { StudyTopicsCard } from "./StudyTopicsCard.jsx";
import { TechnicalQuestionsCard } from "./TechnicalQuestionsCard.jsx";
import { BehavioralQuestionsCard } from "./BehavioralQuestionsCard.jsx";
import { HRQuestionsCard } from "./HRQuestionsCard.jsx";
import { PreparationTipsCard } from "./PreparationTipsCard.jsx";
import { Button } from "../ui/Button.jsx";

export function AIInterviewCoach({ recommendation, onRegenerate, isRegenerating = false }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!recommendation) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
        <ShieldAlert className="h-10 w-10 text-slate-400" />
        <div className="text-center">
          <h4 className="font-bold text-slate-700">No Guide Available Yet</h4>
          <p className="text-slate-500 text-xs mt-1">Schedule an interview or request a manual prep guide generation to get started.</p>
        </div>
      </div>
    );
  }

  const {
    overview = "",
    topics = [],
    technicalQuestions = [],
    behavioralQuestions = [],
    hrQuestions = [],
    skillGapAnalysis = {},
    preparationTips = [],
    recommendations = [],
  } = recommendation;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-teal)] rounded-2xl p-6 md:p-8 text-white shadow-md">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
          <Brain className="h-64 w-64" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider">
              <Sparkles className="h-3 w-3" />
              AI INTERVIEW COACH
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Your Personalized Preparation Guide</h2>
            <p className="text-white/80 text-sm max-w-xl">
              This guide is customized by analyzing the job requirements against your candidate resume profile to boost your performance.
            </p>
          </div>
          
          {onRegenerate && (
            <Button
              variant="secondary"
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="bg-white text-[var(--color-brand-blue)] hover:bg-slate-100 border-none shrink-0 font-bold"
            >
              <RefreshCw className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
              {isRegenerating ? "Regenerating..." : "Regenerate Guide"}
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-slate-200 overflow-x-auto gap-2 scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-all whitespace-nowrap hover:cursor-pointer ${
            activeTab === "overview"
              ? "border-[var(--color-brand-blue-light)] text-[var(--color-brand-blue-light)]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Overview & Study Topics
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-all whitespace-nowrap hover:cursor-pointer ${
            activeTab === "questions"
              ? "border-[var(--color-brand-blue-light)] text-[var(--color-brand-blue-light)]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Expected Questions
        </button>
        <button
          onClick={() => setActiveTab("gap")}
          className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-all whitespace-nowrap hover:cursor-pointer ${
            activeTab === "gap"
              ? "border-[var(--color-brand-blue-light)] text-[var(--color-brand-blue-light)]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Skill Gap Analysis
        </button>
      </div>

      {/* Tab Panels */}
      <div className="space-y-6 transition-all duration-300 animate-settle">
        {activeTab === "overview" && (
          <>
            <RecommendationOverview overview={overview} />
            <StudyTopicsCard topics={topics} />
            <PreparationTipsCard tips={preparationTips} recommendations={recommendations} />
          </>
        )}

        {activeTab === "questions" && (
          <div className="space-y-6">
            <TechnicalQuestionsCard questions={technicalQuestions} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BehavioralQuestionsCard questions={behavioralQuestions} />
              <HRQuestionsCard questions={hrQuestions} />
            </div>
          </div>
        )}

        {activeTab === "gap" && (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-600">
              <span className="font-bold text-slate-800 block mb-1">About the Analysis</span>
              Our AI evaluated your profile skills against the primary and secondary requirements of this job posting. Focus on the missing and weak areas to make the best impression.
            </div>
            <SkillGapCard skillGapAnalysis={skillGapAnalysis} />
          </div>
        )}
      </div>
    </div>
  );
}
