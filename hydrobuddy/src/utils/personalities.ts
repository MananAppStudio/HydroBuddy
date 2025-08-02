import { PersonalityConfig, PersonalityMode } from '../types';

export const personalities: Record<PersonalityMode, PersonalityConfig> = {
  roast: {
    mode: 'roast',
    name: 'Sassy Sally',
    avatar: '😈',
    messages: {
      greeting: [
        "Oh look who finally decided to open the app...",
        "Well well well, if it isn't the dehydrated disaster",
        "Ready to disappoint me with your water intake today?"
      ],
      reminder: [
        "Still sitting there like a dried-up raisin? DRINK WATER!",
        "Your kidneys called, they're filing for divorce. Drink up!",
        "Imagine being defeated by a simple glass of water... pathetic",
        "Your body is literally 60% water and you can't even maintain that? Embarrassing.",
        "Even cacti drink more water than you do"
      ],
      achievement: [
        "Finally! Was that so hard? Don't let it go to your head",
        "Wow, you drank water. Want a medal? Keep going!",
        "I'm shocked. Genuinely shocked. You actually did it",
        "Alert the media! They actually hydrated for once!"
      ],
      encouragement: [
        "Come on, even a houseplant knows how to drink water",
        "I believe in you... barely. Prove me wrong!",
        "You're so close to not being a disappointment. Keep drinking!"
      ],
      warning: [
        "Your pee is probably the color of apple juice right now. Gross.",
        "Dehydration isn't a personality trait, sweetie",
        "At this rate, you'll turn into human jerky"
      ]
    },
    theme: {
      primary: '#FF1744',
      secondary: '#D50000',
      background: '#1a0000',
      text: '#FFFFFF',
      accent: '#FF6B6B'
    }
  },
  anime: {
    mode: 'anime',
    name: 'Aqua-chan',
    avatar: '💧',
    messages: {
      greeting: [
        "Ohayo, Hydration Hero-san! ✨",
        "Konnichiwa! Ready for today's water adventure? UwU",
        "Ara ara~ Someone's looking thirsty today! 💕"
      ],
      reminder: [
        "Mizu o nonde kudasai! (Please drink water!) 🌊",
        "Senpai, your water bottle is calling for you~ Notice it! 💖",
        "Kawaii desu ne~ But you'd be more kawaii if you hydrated! ✨",
        "Hydration Power... MAKE UP! Transform into your best self! 🌟",
        "Believe in the me that believes in you drinking water! 💪"
      ],
      achievement: [
        "Sugoi! You're amazing, Hydration Hero-san! 🎉",
        "Yatta! You did it! I'm so proud of you! ✨💕",
        "Omedeto gozaimasu! Your dedication is inspiring! 🌟",
        "Kawaii! You're glowing with hydration power! ✨"
      ],
      encouragement: [
        "Ganbatte! You can do it! Fighting! 💪",
        "Your water drinking skills are growing stronger! Plus Ultra! 🚀",
        "Believe in yourself like I believe in you, senpai! 💖"
      ],
      warning: [
        "Yamete! Don't neglect your hydration, onegaishimasu! 😢",
        "Senpai... I'm worried about you... Please drink water 🥺",
        "Your hydration level is... it's not daijoubu! 😰"
      ]
    },
    theme: {
      primary: '#E91E63',
      secondary: '#FF80AB',
      background: '#FFF0F5',
      text: '#880E4F',
      accent: '#FFB6C1'
    }
  },
  sergeant: {
    mode: 'sergeant',
    name: 'Sgt. Hydrate',
    avatar: '🪖',
    messages: {
      greeting: [
        "ATTENTION, RECRUIT! Report for hydration duty!",
        "Rise and shine, soldier! Time for H2O operations!",
        "Good morning, trooper! Ready for today's hydration mission?"
      ],
      reminder: [
        "DROP AND GIVE ME 20... OUNCES OF WATER! NOW!",
        "HYDRATION CHECK! Where's your water bottle, soldier?!",
        "This is not a drill! I repeat, NOT A DRILL! DRINK WATER!",
        "You call that hydration?! My grandmother drinks more water than you!",
        "MOVE IT, MOVE IT, MOVE IT! That water won't drink itself!"
      ],
      achievement: [
        "Outstanding work, soldier! You've made your unit proud!",
        "Now THAT'S what I call proper hydration! Hoorah!",
        "Excellent execution, trooper! Keep up the good work!",
        "You've earned your hydration stripes today! Well done!"
      ],
      encouragement: [
        "You've got this, soldier! Show that water who's boss!",
        "I didn't hear no bell! Keep pushing, trooper!",
        "Pain is just dehydration leaving the body! Drink up!"
      ],
      warning: [
        "UNACCEPTABLE! Your hydration levels are critically low!",
        "This is a CODE RED hydration emergency!",
        "Soldier, you're letting your squad down! Hydrate immediately!"
      ]
    },
    theme: {
      primary: '#4CAF50',
      secondary: '#2E7D32',
      background: '#0D2818',
      text: '#FFFFFF',
      accent: '#81C784'
    }
  }
};

export const getPersonality = (mode: PersonalityMode): PersonalityConfig => {
  return personalities[mode];
};

export const getRandomMessage = (personality: PersonalityConfig, type: keyof PersonalityConfig['messages']): string => {
  const messages = personality.messages[type];
  return messages[Math.floor(Math.random() * messages.length)];
};