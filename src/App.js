import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, Send, Volume2, Star, Award, BookOpen, MessageCircle, Settings, Home, BarChart3 } from 'lucide-react';

function ItalianTutorApp() {
  const StatsScreen = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-amber-400 -mx-6 p-8 text-white">
        <h1 className="text-3xl font-bold">I Tuoi Progressi</h1>
        <p className="text-orange-100 mt-2">Analizza i tuoi miglioramenti</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Weekly Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Attività Settimanale</h2>
          <div className="flex justify-between items-end h-40 mb-6 bg-gradient-to-t from-slate-50 to-transparent rounded-xl p-4">
            {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className="w-8 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-lg shadow-lg"
                  style={{ height: `${Math.random() * 100 + 30}px` }}
                ></div>
                <span className="text-sm mt-3 text-slate-600 font-semibold">{day}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 bg-cyan-50 rounded-lg p-3 font-medium">
            Media: 25 min/giorno questa settimana 📈
          </p>
        </div>

        {/* Skills Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Competenze</h2>
          <div className="space-y-6">
            {[
              { skill: 'Pronuncia', level: 87, color: 'from-orange-400 to-amber-400' },
              { skill: 'Grammatica', level: 92, color: 'from-cyan-400 to-blue-400' },
              { skill: 'Vocabolario', level: 78, color: 'from-purple-400 to-pink-400' },
              { skill: 'Ascolto', level: 85, color: 'from-emerald-400 to-teal-400' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700">{item.skill}</span>
                  <span className="font-bold text-slate-800">{item.level}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-500 shadow-sm`}
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ItalianTutorApp = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [currentScreen, setCurrentScreen] = useState('home');
    const [messages, setMessages] = useState([
      {
        id: 1,
        type: 'ai',
        text: 'Ciao Emma! Come stai oggi? Raccontami della tua giornata.',
        translation: 'Szia szépségem! Hogy vagy ma? Mesélj a napodról.',
        audioUrl: null
      }
    ]);
    const [inputText, setInputText] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [userStats, setUserStats] = useState({
      level: 'B1+',
      streak: 12,
      wordsLearned: 847,
      accuracy: 87
    });

    // Mock lesson data
    const lessons = [
      { id: 1, title: 'Famiglia e Amici', completed: true, difficulty: 'Medio' },
      { id: 2, title: 'Al Ristorante', completed: true, difficulty: 'Medio' },
      { id: 3, title: 'Fare Shopping', completed: false, difficulty: 'Difficile', current: true },
      { id: 4, title: 'Viaggiare in Italia', completed: false, difficulty: 'Difficile' }
    ];

    const achievements = [
      { icon: '🇮🇹', title: 'Primo Passo', desc: 'Prima lezione completata' },
      { icon: '🗣️', title: 'Chiacchierone', desc: '50 conversazioni' },
      { icon: '⭐', title: 'Stellare', desc: '7 giorni consecutivi' }
    ];

    const toggleRecording = () => {
      setIsRecording(!isRecording);
      // Itt lenne a valódi mikrofon logika
    };

    const sendMessage = () => {
      if (!inputText.trim()) return;

      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: inputText,
        translation: null,
        audioUrl: null
      };

      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        text: 'Perfetto! La tua pronuncia è migliorata molto. Ora proviamo con una frase più complessa...',
        translation: 'Tökéletes! A kiejtésed sokat javult. Most próbáljunk egy bonyolultabb mondatot...',
        audioUrl: null,
        feedback: {
          accuracy: 92,
          fluency: 88,
          pronunciation: [
            { word: 'molto', score: 95 },
            { word: 'pronuncia', score: 89 },
            { word: 'migliorata', score: 94 }
          ]
        }
      };

      setMessages([...messages, newMessage, aiResponse]);
      setInputText('');
    };

    const HomeScreen = () => (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 -mx-6 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Ciao! Benvenuta! 👋</h1>
            <p className="text-orange-100 text-lg">Pronti per oggi lezione di italiano?</p>
            <div className="mt-6 flex items-center space-x-6 text-sm">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="h-4 w-4 mr-2" />
                <span className="font-semibold">Livello: {userStats.level}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <Award className="h-4 w-4 mr-2" />
                <span className="font-semibold">{userStats.streak} giorni</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/20">
              <div className="text-2xl font-bold text-orange-500">{userStats.wordsLearned}</div>
              <div className="text-sm text-slate-600 font-medium">Parole</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/20">
              <div className="text-2xl font-bold text-cyan-500">{userStats.accuracy}%</div>
              <div className="text-sm text-slate-600 font-medium">Precisione</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg border border-white/20">
              <div className="text-2xl font-bold text-purple-500">{userStats.streak}</div>
              <div className="text-sm text-slate-600 font-medium">Streak</div>
            </div>
          </div>

          {/* Today's Lesson */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h2 className="text-xl font-bold mb-4 flex items-center text-slate-800">
              <BookOpen className="h-6 w-6 mr-3 text-cyan-500" />
              Lezione di Oggi
            </h2>
            <div className="border border-cyan-200 rounded-xl p-5 bg-gradient-to-r from-cyan-50 to-blue-50">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-800 text-lg">Fare Shopping</h3>
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Difficile</span>
              </div>
              <p className="text-slate-600 mb-4">Impara a fare acquisti in Italia</p>
              <button
                onClick={() => setCurrentScreen('lesson')}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Inizia Lezione
              </button>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h2 className="text-xl font-bold mb-4 text-slate-800">Ultimi Successi</h2>
            <div className="space-y-3">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-orange-50 rounded-xl border border-white/30">
                  <span className="text-3xl">{achievement.icon}</span>
                  <div>
                    <div className="font-semibold text-slate-800">{achievement.title}</div>
                    <div className="text-sm text-slate-600">{achievement.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

    const ChatScreen = () => (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4 flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-bold">🇮🇹</span>
          </div>
          <div>
            <div className="font-bold text-slate-800 text-lg">La Tua Insegnante</div>
            <div className="text-sm text-cyan-500 flex items-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-blue-50/50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl ${message.type === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-slate-800 shadow-lg border border-white/20'
                }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.translation && (
                  <p className="text-xs mt-2 opacity-75 italic font-medium">{message.translation}</p>
                )}
                {message.type === 'ai' && (
                  <div className="flex items-center mt-3 space-x-3">
                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                      <Volume2 className="h-4 w-4 text-slate-600" />
                    </button>
                    {message.feedback && (
                      <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full font-semibold">
                        Accuratezza: {message.feedback.accuracy}%
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-lg border-t border-white/20 p-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleRecording}
              className={`p-4 rounded-full transition-all duration-200 transform hover:scale-105 ${isRecording
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse'
                  : 'bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-lg hover:shadow-xl'
                }`}
            >
              {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </button>
            <div className="flex-1 flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Scrivi in italiano..."
                className="flex-1 bg-white/80 backdrop-blur-sm border border-white/30 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-slate-400"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-r-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
          {isRecording && (
            <div className="mt-4 text-center">
              <div className="inline-flex items-center text-red-500 text-sm font-medium bg-red-50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-3"></div>
                Registrazione in corso...
              </div>
            </div>
          )}
        </div>
      </div>
    );

    const LessonsScreen = () => (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 -mx-6 p-8 text-white">
          <h1 className="text-3xl font-bold">Le Tue Lezioni</h1>
          <p className="text-cyan-100 mt-2">Continua il tuo percorso di apprendimento</p>
        </div>

        <div className="px-6 space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className={`border-2 rounded-2xl p-6 transition-all duration-200 ${lesson.current
                ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200 shadow-lg transform scale-105'
                : 'bg-white/80 backdrop-blur-sm border-white/30 shadow-lg'
              }`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-slate-800">{lesson.title}</h3>
                <div className="flex items-center space-x-2">
                  {lesson.completed && <Star className="h-5 w-5 text-amber-400 fill-current" />}
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${lesson.difficulty === 'Medio'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-red-100 text-red-700'
                    }`}>
                    {lesson.difficulty}
                  </span>
                </div>
              </div>

              {lesson.current && (
                <div className="mt-4">
                  <div className="w-full bg-white/60 rounded-full h-3 mb-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-400 to-blue-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 font-medium">Progresso: 65%</p>
                  <button
                    onClick={() => setCurrentScreen('chat')}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Continua
                  </button>
                </div>
              )}

              {lesson.completed && (
                <div className="mt-3 text-amber-600 text-sm flex items-center font-semibold">
                  <Star className="h-4 w-4 mr-2 fill-current" />
                  Completata!
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );

    const StatsScreen = () => (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">I Tuoi Progressi</h1>

        {/* Weekly Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Attività Settimanale</h2>
          <div className="flex justify-between items-end h-32 mb-4">
            {['L', 'M', 'M', 'G', 'V', 'S', 'D'].map((day, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className="w-6 bg-blue-500 rounded-t"
                  style={{ height: `${Math.random() * 80 + 20}px` }}
                ></div>
                <span className="text-xs mt-2 text-gray-600">{day}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">Media: 25 min/giorno questa settimana</p>
        </div>

        {/* Skills Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Competenze</h2>
          <div className="space-y-4">
            {[
              { skill: 'Pronuncia', level: 87, color: 'bg-green-500' },
              { skill: 'Grammatica', level: 92, color: 'bg-blue-500' },
              { skill: 'Vocabolario', level: 78, color: 'bg-purple-500' },
              { skill: 'Ascolto', level: 85, color: 'bg-orange-500' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.skill}</span>
                  <span>{item.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${item.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    const renderScreen = () => {
      switch (currentScreen) {
        case 'home': return <HomeScreen />;
        case 'chat': return <ChatScreen />;
        case 'lessons': return <LessonsScreen />;
        case 'stats': return <StatsScreen />;
        default: return <HomeScreen />;
      }
    };

    return (
      <div className="max-w-md mx-auto bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white/80 backdrop-blur-lg border-t border-white/20 flex justify-around py-3 shadow-lg">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'lessons', icon: BookOpen, label: 'Lezioni' },
            { id: 'chat', icon: MessageCircle, label: 'Chat' },
            { id: 'stats', icon: BarChart3, label: 'Progressi' }
          ].map((nav) => (
            <button
              key={nav.id}
              onClick={() => setCurrentScreen(nav.id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${currentScreen === nav.id
                  ? 'text-cyan-400 bg-cyan-50 shadow-lg transform scale-105'
                  : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              <nav.icon className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };
}

export default ItalianTutorApp;