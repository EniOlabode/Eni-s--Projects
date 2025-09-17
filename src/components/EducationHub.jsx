import { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Star, 
  Trophy, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Building2,
  Play,
  Clock,
  Award,
  Target,
  ArrowRight,
  Users,
  Lightbulb,
  FileText,
  Calculator
} from "lucide-react";

const learningTracks = [
  {
    id: 1,
    title: "Building Business Credit",
    description: "Learn how to establish and build your business credit score from scratch",
    icon: CreditCard,
    color: "bg-blue-500",
    lightColor: "bg-blue-100",
    modules: 6,
    duration: "45 min",
    difficulty: "Beginner",
    points: 120,
    completed: 4,
    modules_list: [
      { title: "Why Business Credit Matters", duration: "8 min", completed: true, points: 20 },
      { title: "Setting Up Your Business Entity", duration: "10 min", completed: true, points: 20 },
      { title: "Opening Your First Business Bank Account", duration: "12 min", completed: true, points: 25 },
      { title: "Working with Vendors to Build Credit", duration: "8 min", completed: true, points: 20 },
      { title: "Understanding Credit Reports", duration: "7 min", completed: false, points: 20 },
      { title: "Monitoring and Improving Your Score", duration: "10 min", completed: false, points: 25 }
    ]
  },
  {
    id: 2,
    title: "Applying for Loans",
    description: "Master the loan application process and increase your approval chances",
    icon: DollarSign,
    color: "bg-green-500",
    lightColor: "bg-green-100",
    modules: 5,
    duration: "38 min",
    difficulty: "Intermediate",
    points: 100,
    completed: 0,
    modules_list: [
      { title: "Types of Business Loans", duration: "10 min", completed: false, points: 20 },
      { title: "Preparing Your Documentation", duration: "12 min", completed: false, points: 25 },
      { title: "Understanding Interest Rates & Terms", duration: "8 min", completed: false, points: 15 },
      { title: "SBA Loans and Government Programs", duration: "8 min", completed: false, points: 20 },
      { title: "Loan Application Best Practices", duration: "10 min", completed: false, points: 20 }
    ]
  },
  {
    id: 3,
    title: "Using Capital Effectively",
    description: "Learn smart strategies for investing your capital to grow your business",
    icon: TrendingUp,
    color: "bg-purple-500",
    lightColor: "bg-purple-100",
    modules: 4,
    duration: "32 min",
    difficulty: "Advanced",
    points: 80,
    completed: 0,
    modules_list: [
      { title: "Budgeting and Cash Flow Management", duration: "10 min", completed: false, points: 20 },
      { title: "Smart Reinvestment Strategies", duration: "8 min", completed: false, points: 20 },
      { title: "Avoiding Common Debt Traps", duration: "7 min", completed: false, points: 20 },
      { title: "ROI Analysis for Business Decisions", duration: "7 min", completed: false, points: 20 }
    ]
  },
  {
    id: 4,
    title: "Bank Partnerships & Ally Financial",
    description: "Maximize benefits through strategic banking partnerships",
    icon: Building2,
    color: "bg-orange-500",
    lightColor: "bg-orange-100",
    modules: 4,
    duration: "28 min",
    difficulty: "Beginner",
    points: 80,
    completed: 0,
    modules_list: [
      { title: "Opening Your Ally Business Account", duration: "8 min", completed: false, points: 20 },
      { title: "Maximizing Banking Benefits", duration: "7 min", completed: false, points: 20 },
      { title: "Building Relationships with Your Banker", duration: "6 min", completed: false, points: 20 },
      { title: "Leveraging Bank Resources for Growth", duration: "7 min", completed: false, points: 20 }
    ]
  }
];

const achievements = [
  { name: "First Steps", description: "Complete your first module", icon: Star, earned: true },
  { name: "Credit Builder", description: "Complete Building Business Credit track", icon: CreditCard, earned: true },
  { name: "Loan Expert", description: "Complete Applying for Loans track", icon: DollarSign, earned: false },
  { name: "Capital Master", description: "Complete Using Capital Effectively track", icon: TrendingUp, earned: false },
  { name: "Banking Pro", description: "Complete Bank Partnerships track", icon: Building2, earned: false },
  { name: "Financially Literate", description: "Complete all learning tracks", icon: Trophy, earned: false }
];

export const EducationHub = () => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  const totalModules = learningTracks.reduce((sum, track) => sum + track.modules, 0);
  const completedModules = learningTracks.reduce((sum, track) => sum + track.completed, 0);
  const totalPoints = learningTracks.reduce((sum, track) => sum + track.points, 0);
  const earnedPoints = learningTracks.reduce((sum, track) => {
    return sum + track.modules_list.slice(0, track.completed).reduce((moduleSum, module) => moduleSum + module.points, 0);
  }, 0);

  const completeModule = (trackId, moduleIndex) => {
    // In a real app, this would update the backend and sync with the dashboard
    alert(`Module completed! +${learningTracks.find(t => t.id === trackId).modules_list[moduleIndex].points} points earned!`);
  };

  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Education <span className="text-primary">Hub</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master essential financial literacy skills through bite-sized, practical modules. 
            Complete courses to earn points and unlock real-world business benefits.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Modules Completed</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{completedModules}/{totalModules}</p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedModules / totalModules) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Points Earned</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{earnedPoints}/{totalPoints}</p>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
              <div 
                className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(earnedPoints / totalPoints) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Achievements</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {achievements.filter(a => a.earned).length}/{achievements.length}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Learning Tracks</span>
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {learningTracks.filter(t => t.completed === t.modules).length}/{learningTracks.length}
            </p>
          </div>
        </div>

        {!selectedTrack ? (
          <>
            {/* Learning Tracks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {learningTracks.map((track) => {
                const IconComponent = track.icon;
                const progress = (track.completed / track.modules) * 100;
                
                return (
                  <div
                    key={track.id}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedTrack(track)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 ${track.lightColor} dark:${track.color} rounded-lg`}>
                        <IconComponent className={`h-6 w-6 text-white dark:text-white`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-primary transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                          {track.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {track.modules} modules
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {track.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {track.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Progress: {track.completed}/{track.modules}
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className={`${track.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        track.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        track.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {track.difficulty}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg text-center transition-all duration-300 ${
                        achievement.earned 
                          ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 shadow-md' 
                          : 'bg-slate-100 dark:bg-slate-700 opacity-50'
                      }`}
                    >
                      <IconComponent className={`h-8 w-8 mx-auto mb-2 ${
                        achievement.earned ? 'text-yellow-600' : 'text-slate-400'
                      }`} />
                      <p className={`text-xs font-medium ${
                        achievement.earned ? 'text-yellow-800 dark:text-yellow-200' : 'text-slate-500'
                      }`}>
                        {achievement.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Track Detail View */
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => setSelectedTrack(null)}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Learning Tracks
              </button>
              <div className="flex items-center gap-2">
                <selectedTrack.icon className="h-5 w-5 text-primary" />
                <span className="font-medium text-slate-800 dark:text-white">{selectedTrack.title}</span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedTrack.modules_list.map((module, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    module.completed 
                      ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                      : 'border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {module.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Play className="h-5 w-5 text-slate-400" />
                      )}
                      <div>
                        <h4 className="font-medium text-slate-800 dark:text-white">{module.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {module.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            +{module.points} points
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => completeModule(selectedTrack.id, index)}
                      disabled={module.completed}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        module.completed
                          ? 'bg-green-100 text-green-800 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                    >
                      {module.completed ? 'Completed' : 'Start Module'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
