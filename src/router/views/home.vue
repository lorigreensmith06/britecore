<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import ViewCSV from './viewCSV'

export default {
  components: { Layout, ViewCSV },
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
}
</script>

<template>
  <Layout>
    <img src="@assets/images/britecore-logo.png" alt="Logo" /><br /><br />
    <ViewCSV />
  </Layout>
</template>
