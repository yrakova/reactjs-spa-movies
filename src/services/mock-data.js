const mockMoviesData = {
  movies: [
    {
      id: '1',
      title: 'Pulp Fiction',
      description:
        "Quentin Tarantino's film that won the Palme d'Or at the Cannes Film Festival, Oscar and had a huge impact on cinema.",
      genres: ['thriller', 'comedy', 'crime'],
      year: 1994,
      posterUri: '/public/images/posters/pulp_fiction.jpg',
      runtime: 120,
      rating: 4.9,
    },
    {
      id: '2',
      title: 'Bohemian Rhapsody',
      description:
        'The story of the legendary band Queen and its founder. Sensational biopic that won four Oscars.',
      genres: ['drama', 'biography', 'music'],
      year: 2018,
      posterUri: '/public/images/posters/bohemian-rhapsody.jpg',
      runtime: 121,
      rating: 4.8,
    },
    {
      id: '3',
      title: 'Kill Bill: Vol 2',
      description:
        "Black Mamba is getting closer to the leader of the gang. Continuation of Quentin Tarantino's cinephile action.",
      genres: ['action', 'thriller', 'crime'],
      year: 2004,
      posterUri: '/public/images/posters/kill_bill_v2.jpg',
      runtime: 110,
      rating: 4.7,
    },
    {
      id: '4',
      title: 'Moana',
      description:
        'The daughter of a leader and a stubborn demigod save nature from destruction. Disney Ocean Journey with Songs and Challenges.',
      genres: ['cartoon', 'music', 'fantasy', 'comedy', 'adventure', 'family'],
      year: 2016,
      posterUri: '/public/images/posters/moana.jpg',
      runtime: 107,
      rating: 4.5,
    },
    {
      id: '5',
      title: 'Interstellar',
      description:
        'A fantastic epic about a choking Earth, space flights and paradoxes of time. Oscar for special effects.',
      genres: ['fantasy', 'drama', 'adventure'],
      year: 2014,
      posterUri: '/public/images/posters/interstellar.jpg',
      runtime: 130,
      rating: 4.2,
    },
    {
      id: '6',
      title: 'Pretty Woman',
      description:
        'The famous rom-com about the love of a millionaire and a girl with low social responsibility.',
      year: 1990,
      genres: ['melodrama', 'comedy'],
      posterUri: '/public/images/posters/pretty_woman.jpg',
      runtime: 90,
      rating: 5.0,
    },
  ],
};

const GENRES = [
  { id: 1, label: 'melodrama' },
  { id: 2, label: 'comedy' },
  { id: 3, label: 'fantasy' },
  { id: 4, label: 'drama' },
  { id: 5, label: 'adventure' },
  { id: 6, label: 'cartoon' },
  { id: 7, label: 'music' },
  { id: 8, label: 'family' },
  { id: 9, label: 'action' },
  { id: 10, label: 'thriller' },
  { id: 11, label: 'crime' },
  { id: 12, label: 'biography' },
];

const SORT_BY_VALUES = [
  { id: 1, label: 'Release Date', value: 'year' },
  { id: 2, label: 'Title', value: 'title' },
];

export { mockMoviesData, GENRES, SORT_BY_VALUES };
