export async function seed(knex) {
  await knex('users').insert([
    { id: 99901, name: 'Ambitious Aardvark', description: 'aardvark@example.org', link:'' },
    { id: 99902, name: 'Bamboozled Baboon', description: 'baboon@example.org' , link:''},
    { id: 99903, name: 'Curious Capybara', description: 'capybara@example.org' , link:''},
    { id: 99904, name: 'Dilapidated Duck', description: 'duck@example.org', link:'' },
    { id: 99905, name: 'Exuberant Elephant', description: 'elephant@example.org' , link:''},
    
  ])
}
