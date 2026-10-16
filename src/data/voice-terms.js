// Data for voice input (src/services/vocab.js). Edit freely; spelling and capitals here are
// what the app writes.

// Tech words sent to the speech service as hints (Android 13+), after My words and the profile
// name. Keep this list short: every hint makes the service more likely to "hear" that word.
export const TECH_HINTS = ['AWS', 'DevOps', 'Kubernetes', 'Docker', 'React', 'Node.js', 'JavaScript', 'Python', 'SQL', 'API', 'CI/CD', 'GitHub', 'Linux'];

// Countries and cities. A heard word on this list is never changed automatically
// ("Pakistan" stays "Pakistan" even if the speaker's hometown is Pakpattan), unless the user
// adds an explicit alias in My words.
export const PLACES = [
  // Countries
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain',
  'Bangladesh', 'Belarus', 'Belgium', 'Bhutan', 'Bolivia', 'Bosnia', 'Brazil', 'Brunei', 'Bulgaria', 'Cambodia',
  'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Denmark', 'Egypt',
  'England', 'Estonia', 'Ethiopia', 'Finland', 'France', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Libya', 'Lithuania',
  'Malaysia', 'Maldives', 'Mexico', 'Mongolia', 'Morocco', 'Myanmar', 'Nepal', 'Netherlands', 'Holland', 'Nigeria',
  'Norway', 'Oman', 'Pakistan', 'Palestine', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Rwanda', 'Saudi', 'Arabia', 'Scotland', 'Senegal', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia',
  'Somalia', 'Spain', 'Sudan', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
  'Tunisia', 'Turkey', 'Turkiye', 'Turkmenistan', 'Uganda', 'Ukraine', 'Emirates', 'UAE', 'UK', 'USA', 'America',
  'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Wales', 'Yemen', 'Zambia', 'Zimbabwe', 'Dubai', 'Europe', 'Asia',
  'Africa',
  // Pakistan
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot',
  'Gujranwala', 'Hyderabad', 'Bahawalpur', 'Sargodha', 'Sukkur', 'Larkana', 'Abbottabad', 'Mardan', 'Okara',
  'Sahiwal', 'Pakpattan', 'Kasur', 'Jhang', 'Sheikhupura', 'Rahim Yar Khan', 'Gujrat', 'Jhelum', 'Muzaffarabad', 'Mirpur',
  'Gilgit', 'Skardu', 'Swat', 'Murree', 'Chiniot', 'Vehari', 'Khanewal', 'Dera Ghazi Khan', 'Mianwali', 'Attock',
  'Punjab', 'Sindh', 'Balochistan', 'Khyber', 'Pakhtunkhwa', 'Kashmir',
  // India
  'Delhi', 'Mumbai', 'Bombay', 'Kolkata', 'Chennai', 'Bangalore', 'Bengaluru', 'Pune', 'Ahmedabad', 'Jaipur',
  'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Patna', 'Surat', 'Noida', 'Gurgaon', 'Gurugram', 'Chandigarh',
  'Amritsar', 'Kochi', 'Goa', 'Kerala',
  // Other big cities
  'London', 'Paris', 'Berlin', 'Tokyo', 'Beijing', 'Riyadh', 'Jeddah', 'Doha', 'Toronto', 'Sydney', 'Istanbul'
];
