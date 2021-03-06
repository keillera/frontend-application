<template>
  <nuxt-link
    class="eyecatch-article-card"
    :class="order"
    :to="`/${article.user_id}/articles/${article.article_id}`"
    :style="{ background: `url(${eyeCatchImagePath}) center center / cover no-repeat` }"
  >
    <div class="article-subdata-box">
      <div class="label">
        {{ topicDisplayName }}
      </div>
      <div v-if="isPaidArticle" class="label">
        有料
      </div>
    </div>
    <h2 class="title">
      {{ decodedTitle }}
    </h2>
    <no-ssr>
      <nuxt-link :to="`/users/${article.user_id}`" class="article-data-box">
        <span class="username">
          {{ decodedUsername }}
        </span>
        <span class="published-at">
          {{ formattedPublishedAt }}
        </span>
      </nuxt-link>
    </no-ssr>
    <span class="token-amount">
      {{ article.alisToken | formatTokenAmount }}
    </span>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'
import { htmlDecode, formatTokenAmount } from '~/utils/article'
import { formatDate } from '~/utils/format'

export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    order: {
      type: String,
      required: true
    }
  },
  computed: {
    decodedTitle() {
      return htmlDecode(this.article.title)
    },
    decodedUsername() {
      return htmlDecode(this.article.userInfo.user_display_name)
    },
    publishedAt() {
      return this.article.published_at || this.article.created_at
    },
    formattedPublishedAt() {
      return formatDate(this.publishedAt)
    },
    eyeCatchImagePath() {
      return this.article.eye_catch_url !== null && this.article.eye_catch_url !== undefined
        ? `${this.article.eye_catch_url}?d=${this.order === 'eyecatch1' ? '1420x824' : '680x382'}`
        : require('~/assets/images/pc/common/thumbnail_noimg.png')
    },
    topicDisplayName() {
      const topic = this.topics.find((topic) => topic.name === this.article.topic)
      return topic.display_name
    },
    isPaidArticle() {
      return !!this.article.price
    },
    ...mapGetters('article', ['topics'])
  },
  filters: {
    formatTokenAmount
  }
}
</script>

<style lang="scss" scoped>
.eyecatch-article-card {
  @include cassette-shadow();
  border-radius: 4px;
  position: relative;
  text-decoration: none;

  &:before {
    content: '';
    border-radius: 4px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
  }

  &.eyecatch1 {
    grid-area: eyecatch1;
    width: 710px;
    height: 412px;
  }

  &.eyecatch2 {
    grid-area: eyecatch2;
  }

  &.eyecatch3 {
    grid-area: eyecatch3;
  }

  &.eyecatch2,
  &.eyecatch3 {
    width: 340px;
    height: 191px;
  }
}

.article-subdata-box {
  bottom: 124px;
  display: flex;
  left: 20px;
  position: absolute;
}

.label {
  align-content: center;
  background: rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 12px;
  font-weight: bold;
  margin-right: 8px;
  padding: 4px 8px;
}

.title {
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  bottom: 60px;
  color: #fff;
  display: -webkit-box;
  font-size: 20px;
  font-weight: bold;
  grid-area: title;
  height: 60px;
  left: 20px;
  letter-spacing: 1px;
  line-height: 1.5;
  margin: 0;
  overflow: hidden;
  position: absolute;
  text-decoration: none;
  text-overflow: ellipsis;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.6);
}

.eyecatch1 {
  .title {
    width: 492px;
  }
}

.eyecatch2,
.eyecatch3 {
  .title {
    width: 300px;
  }
}

.article-data-box {
  bottom: 10px;
  height: 46px;
  left: 20px;
  position: absolute;
  width: 220px;
}

.username,
.published-at,
.token-amount {
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.8px;
  position: absolute;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
}

.username {
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  top: 6px;
  white-space: nowrap;
  width: 190px;
}

.published-at {
  bottom: 6px;
}

.token-amount {
  align-items: center;
  background: url('~assets/images/pc/common/icon_logo_white.png') no-repeat;
  background-size: 18px;
  bottom: 0;
  display: flex;
  height: 18px;
  margin: 0;
  letter-spacing: 0.8px;
  padding: 0 0 0 22px;
  right: 20px;
  bottom: 14px;
}
</style>
