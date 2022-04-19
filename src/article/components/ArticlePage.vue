<template>
  <div class="TeamPage">
    <ArticleHero>
      <template #title>写的一些水文</template>
      <template #lead>
        涵盖各个知识面的文章
      </template>
    </ArticleHero>

    <ArticleList :members="data">
      <template #title>Core Team Members</template>
      <template #lead>
      Core team members are those who are actively involved in the
        maintenance of one or more core projects. They have made significant
        contributions to the Vue ecosystem, with a long term commitment to the
        success of the project and its users.
      </template>
    </ArticleList>

    <ArticleList :members="data">
      <template #title>Core Team Emeriti</template>
      <template #lead
        >Here we honor some no-longer-active core team members who have made
        valuable contributions in the past.</template
      >
    </ArticleList>

    <ArticleList :members="data">
      <template #title>Community Partners</template>
      <template #lead
        >Some members of the Vue community have so enriched it, that they
        deserve special mention. We've developed a more intimate relationship
        with these key partners, often coordinating with them on upcoming
        features and news.</template
      >
    </ArticleList>
  </div>
</template>
<script setup lang="ts">
import ArticleHero from './ArticleHero.vue'
import ArticleList from './ArticleList.vue'

const data = [
  // {
  //   name: 'Evan You',
  //   title: 'Creator',
  //   company: 'Vue.js',
  //   projects: [
  //     {
  //       label: 'vuejs/*',
  //       url: 'https://www.github.com/vuejs'
  //     },
  //     {
  //       label: 'vitejs/*',
  //       url: 'https://www.github.com/vitejs'
  //     }
  //   ],
  //   website: {
  //     label: 'evanyou.me',
  //     url: 'https://evanyou.me'
  //   },
  //   socials: {
  //     github: 'yyx990803',
  //     twitter: 'youyuxi'
  //   },
  //   sponsor: true
  // }
]
</script>

<style scoped>
.TeamPage {
  padding-bottom: 16px;
}

@media (min-width: 768px) {
  .TeamPage {
    padding-bottom: 96px;
  }
}

.TeamList + .TeamList {
  padding-top: 64px;
}
</style>
