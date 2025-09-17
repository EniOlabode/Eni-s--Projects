import { useState, useEffect } from 'react';
import { 
  Trophy, 
  Star, 
  Award, 
  TrendingUp, 
  Users, 
  Building, 
  Target,
  Gift,
  Crown,
  Medal,
  Zap,
  CheckCircle,
  Plus,
  Calendar,
  BarChart3,
  User,
  MapPin,
  Briefcase
} from 'lucide-react';

export const Dashboard = () => {
  const [userPoints, setUserPoints] = useState(340);
  const [currentTier, setCurrentTier] = useState('Silver');
  const [monthlyRank, setMonthlyRank] = useState(7);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');

  // Mock data for demonstration
  const [recentActions, setRecentActions] = useState([
    { id: 1, action: 'Hired formerly incarcerated person', points: 80, date: '2024-01-15' },
    { id: 2, action: 'Sourced from local business', points: 90, date: '2024-01-14' },
    { id: 3, action: 'Hired without college degree', points: 70, date: '2024-01-12' }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, company: 'Detroit Tech Solutions', points: 890, tier: 'Platinum' },
    { rank: 2, company: 'Motor City Manufacturing', points: 750, tier: 'Gold' },
    { rank: 3, company: 'Great Lakes Consulting', points: 680, tier: 'Gold' },
    { rank: 4, company: 'Renaissance Builders', points: 520, tier: 'Silver' },
    { rank: 5, company: 'Riverfront Logistics', points: 480, tier: 'Silver' },
    { rank: 6, company: 'Innovation Hub Detroit', points: 420, tier: 'Silver' },
    { rank: 7, company: 'Your Company', points: userPoints, tier: currentTier },
    { rank: 8, company: 'Metro Food Services', points: 310, tier: 'Bronze' }
  ]);

  const actionTypes = [
    { name: 'Hire formerly incarcerated person', points: 80, icon: Users },
    { name: 'Hire without college degree', points: 70, icon: Users },
    { name: 'Source from local business', points: 90, icon: Building },
    { name: 'Provide job training program', points: 60, icon: Target },
    { name: 'Mentor local entrepreneur', points: 50, icon: Star }
  ];

  const rewards = [
    { name: 'Government Publication Recognition', cost: 20, available: true },
    { name: 'Tax Break Eligibility', cost: 100, available: true },
    { name: 'Fast-track Grant Review', cost: 150, available: false },
    { name: 'Mayor Event Invitation', cost: 200, available: false },
    { name: 'City Partnership Opportunity', cost: 300, available: false }
  ];

  const badges = [
    { name: 'Second Chance Employer', earned: true, icon: Users },
    { name: 'Local Champion', earned: true, icon: Building },
    { name: 'Community Builder', earned: false, icon: Star },
    { name: 'Equity Pioneer', earned: false, icon: Award }
  ];

  const getTierInfo = (tier) => {
    const tiers = {
      Bronze: { color: 'text-amber-600', bgColor: 'bg-amber-100', nextTier: 'Silver', pointsNeeded: 200 },
      Silver: { color: 'text-gray-600', bgColor: 'bg-gray-100', nextTier: 'Gold', pointsNeeded: 500 },
      Gold: { color: 'text-yellow-600', bgColor: 'bg-yellow-100', nextTier: 'Platinum', pointsNeeded: 750 },
      Platinum: { color: 'text-purple-600', bgColor: 'bg-purple-100', nextTier: null, pointsNeeded: null }
    };
    return tiers[tier] || tiers.Bronze;
  };

  const tierInfo = getTierInfo(currentTier);
  const progressToNext = tierInfo.pointsNeeded ? ((userPoints / tierInfo.pointsNeeded) * 100) : 100;

  const logAction = (actionType, points) => {
    const newAction = {
      id: Date.now(),
      action: actionType,
      points: points,
      date: new Date().toISOString().split('T')[0]
    };
    
    setRecentActions(prev => [newAction, ...prev.slice(0, 4)]);
    setUserPoints(prev => prev + points);
    setShowActionModal(false);
  };

  return (
    <section id="dashboard" className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
            Impact Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Track your community impact and earn rewards for making a difference
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Total Points</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white">{userPoints}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Current Tier</p>
                <p className={`text-2xl font-bold ${tierInfo.color}`}>{currentTier}</p>
              </div>
              <div className={`p-3 ${tierInfo.bgColor} rounded-full`}>
                <Crown className={`h-6 w-6 ${tierInfo.color}`} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Monthly Rank</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white">#{monthlyRank}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Actions This Month</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white">{recentActions.length}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress to Next Tier */}
        {tierInfo.nextTier && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Progress to {tierInfo.nextTier}
              </h3>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {userPoints} / {tierInfo.pointsNeeded} points
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressToNext, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Log New Action</h3>
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actionTypes.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => logAction(action.name, action.points)}
                    className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <action.icon className="h-5 w-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600" />
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white text-sm">{action.name}</p>
                        <p className="text-blue-600 font-semibold">+{action.points} points</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Recent Actions</h3>
              <div className="space-y-4">
                {recentActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{action.action}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{action.date}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-green-600">+{action.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Monthly Leaderboard</h3>
              <div className="space-y-3">
                {leaderboard.slice(0, 8).map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      entry.company === 'Your Company' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700' 
                        : 'bg-slate-50 dark:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        entry.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {entry.rank <= 3 ? <Medal className="h-4 w-4" /> : entry.rank}
                      </div>
                      <div>
                        <p className={`font-medium ${
                          entry.company === 'Your Company' ? 'text-blue-800 dark:text-blue-200' : 'text-slate-800 dark:text-white'
                        }`}>
                          {entry.company}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{entry.tier} Tier</p>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-white">{entry.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* User Profile */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Profile</h3>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    <User className="h-10 w-10" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${tierInfo.bgColor} rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800`}>
                    <Crown className={`h-3 w-3 ${tierInfo.color}`} />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                  Sarah Johnson
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  CEO, Detroit Innovation Hub
                </p>
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <MapPin className="h-3 w-3" />
                  <span>Detroit, MI</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-semibold text-slate-800 dark:text-white">{userPoints}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Points</p>
                  </div>
                  <div className="text-center">
                    <p className={`font-semibold ${tierInfo.color}`}>{currentTier}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Tier</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-slate-800 dark:text-white">#{monthlyRank}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Rank</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Badges Earned</h3>
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg text-center ${
                      badge.earned 
                        ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800' 
                        : 'bg-slate-100 dark:bg-slate-700 opacity-50'
                    }`}
                  >
                    <badge.icon className={`h-8 w-8 mx-auto mb-2 ${
                      badge.earned ? 'text-yellow-600' : 'text-slate-400'
                    }`} />
                    <p className={`text-sm font-medium ${
                      badge.earned ? 'text-yellow-800 dark:text-yellow-200' : 'text-slate-500'
                    }`}>
                      {badge.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards Store */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Available Rewards</h3>
              <div className="space-y-4">
                {rewards.map((reward, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      reward.available && userPoints >= reward.cost
                        ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                        : 'border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className={`font-medium ${
                        reward.available && userPoints >= reward.cost
                          ? 'text-green-800 dark:text-green-200'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {reward.name}
                      </p>
                      <Gift className={`h-4 w-4 ${
                        reward.available && userPoints >= reward.cost
                          ? 'text-green-600'
                          : 'text-slate-400'
                      }`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-blue-600">{reward.cost} points</span>
                      <button 
                        disabled={!reward.available || userPoints < reward.cost}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          reward.available && userPoints >= reward.cost
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {userPoints >= reward.cost ? 'Claim' : 'Locked'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
