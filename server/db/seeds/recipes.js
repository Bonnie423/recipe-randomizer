export function seed(knex) {
  // Deletes ALL existing entries
  return knex('recipes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {
          id: 1,
          name: 'Empellón-Grade Sea Urchin Guacamole Tacos',
          image: './public/Images/sea urchin guacamole tacos.jpg',
          description: '',
          link: 'https://www.foodrepublic.com/recipes/alex-stupaks-sea-urchin-guacamole-tacos/',
        },
        {
          id: 2,
          name: 'Buttered-Toast Ramen With Bacon And Eggs',
          image: './public/Images/butter-toast-ramen.jpg',
          description: '',
          link: 'https://www.foodrepublic.com/recipes/buttered-toast-ramen-with-bacon-and-eggs/',
        },
        // Add more recipe entries here

        {
          id: 3,
          name: 'Peeping Mushroom Pasta',
          image: './public/Images/peeping-mushroom-pasta.jpg',
          description: '',
          link: 'https://www.foodrepublic.com/recipes/peeping-mushroom-pasta/',
        },

        {
          id: 4,
          name: 'Charred Brussels Sprouts With Spicy Anchovy Butter',
          image: './public/Images/charred-spouts.jpg',
          description: '',
          link: 'https://www.foodrepublic.com/recipes/charred-brussels-sprouts-with-spicy-anchovy-butter/',
        },

        {
          id: 5,
          name: 'Chorizo And Cheese Grilled Stuffed Bell Peppers',
          image: './public/Images/bell-peppers.jpg',
          description: '',
          link: 'https://www.foodrepublic.com/recipes/test-kitchen-grilled-stuffed-bell-peppers/',
        },
      ])
    })
}

