<template>
  <div>
    <h2>6. 在 data 初始化之前进行“终极拦截”（仅讲解）</h2>
    <pre>{{ text }}</pre>
    <div class="article">
      <h1>🔐 权限拦截：<code>beforeCreate</code> vs 路由守卫</h1>

      <blockquote>
        在 Vue 2 中，<code>beforeCreate</code> 是组件生命周期中最早执行的钩子，
        在路由守卫之外，提供了一种“组件级权限拦截”的能力。
      </blockquote>

      <!-- ============================================================ -->
      <h2>📌 怎么干：基于 <code>beforeCreate</code> 的权限拦截</h2>

      <p>
        核心思路：在组件最早的生命周期里读取权限配置，无权限则直接终止实例化。
      </p>

      <h3>1️⃣ 创建权限 Mixin</h3>

      <pre><code>// src/mixins/permissionMixin.js

import { checkPermission } from '@/utils/permission'

export const permissionMixin = {
  beforeCreate() {
    // 读取组件声明的权限要求
    const requiresAuth = this.$options.meta?.requiresAuth
    if (!requiresAuth) return

    const componentName = this.$options.name || 'Unknown'

    // 校验权限（同步方式）
    const hasPermission = checkPermission(componentName)

    if (!hasPermission) {
      // 跳转 403
      this.$router?.replace('/403')
      // 抛错终止实例化
      throw new Error(`[权限拦截] ${componentName} 无权限`)
    }
  }
}</code></pre>

      <h3>2️⃣ 在组件里声明权限</h3>

      <pre><code>// src/components/AdminPanel.vue

import { permissionMixin } from '@/mixins/permissionMixin'

export default {
  name: 'AdminPanel',
  mixins: [permissionMixin],
  meta: {
    requiresAuth: true   // 🔥 声明需要权限
  },
  // ...
}</code></pre>

      <!-- ============================================================ -->
      <h2>⚖️ 与路由守卫的区别</h2>

      <table>
        <thead>
          <tr>
            <th>维度</th>
            <th>路由守卫</th>
            <th><code>beforeCreate</code></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>拦截时机</strong></td>
            <td>路由跳转时，还没进入组件</td>
            <td>组件已经开始创建了才拦</td>
          </tr>
          <tr>
            <td><strong>拦截粒度</strong></td>
            <td>路由级别（整页）</td>
            <td>组件级别（单个组件）</td>
          </tr>
          <tr>
            <td><strong>性能影响</strong></td>
            <td>最小（组件都没创建）</td>
            <td>中等（实例已创建，但未初始化 data）</td>
          </tr>
          <tr>
            <td><strong>触发范围</strong></td>
            <td>只拦截路由跳转</td>
            <td>拦截任何渲染方式（<code>v-if</code>、动态组件等）</td>
          </tr>
          <tr>
            <td><strong>代码组织</strong></td>
            <td>集中在 <code>router.js</code></td>
            <td>分散在组件或全局 mixin</td>
          </tr>
          <tr>
            <td><strong>官方推荐</strong></td>
            <td>✅ 标准做法</td>
            <td>⚠️ 特殊场景补充</td>
          </tr>
        </tbody>
      </table>

      <!-- ============================================================ -->
      <h2>🚨 路由守卫搞不定的场景（<code>beforeCreate</code> 不可替代）</h2>

      <ul>
        <li>
          <strong>同一个路由下，根据条件动态渲染不同子组件</strong><br />
          路由守卫只拦路由级别，管不到路由内部
          <code>&lt;component :is="..."&gt;</code> 的动态切换。
        </li>
        <li>
          <strong>非路由跳转触发的组件渲染（如 <code>v-if</code>）</strong
          ><br />
          路由守卫只拦路由跳转，拦不住
          <code>v-if="showAdminPanel"</code> 的组件。
        </li>
        <li>
          <strong>第三方组件库内部的权限控制</strong><br />
          路由守卫在业务层，管不到库内部的组件渲染。
        </li>
        <li>
          <strong>微前端子应用独立控制权限</strong><br />
          子应用可能没有全局路由，只能用组件级钩子。
        </li>
        <li>
          <strong>同一页面内，不同区域权限不同</strong><br />
          路由守卫只能拦整页，拦不住页面内的局部组件。
        </li>
      </ul>

      <!-- ============================================================ -->
      <h2>✅ 最佳实践：双重保险</h2>

      <p>
        路由守卫做“大门拦截”，<code>beforeCreate</code> 做“房间门锁”二次校验。
      </p>

      <pre><code>// 1. 路由守卫：大门保安
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !hasPermission(to.name)) {
    next('/403')
  } else {
    next()
  }
})

// 2. beforeCreate 拦截：房间门锁
export const permissionMixin = {
  beforeCreate() {
    if (this.$options.meta?.requiresAuth && !checkPermission(this.$options.name)) {
      this.$router.replace('/403')
      throw new Error('无权限')
    }
  }
}</code></pre>

      <!-- ============================================================ -->
      <h2>📊 总结</h2>

      <table>
        <thead>
          <tr>
            <th>问题</th>
            <th>答案</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>路由权限怎么做？</strong></td>
            <td>
              全局 mixin 的 <code>beforeCreate</code> 里读
              <code>$options.meta.requiresAuth</code>，无权限则跳转 + 抛错
            </td>
          </tr>
          <tr>
            <td><strong>和路由守卫的区别？</strong></td>
            <td>
              路由守卫在“进门”前拦，<code>beforeCreate</code>
              在“进门后、进屋前”拦
            </td>
          </tr>
          <tr>
            <td><strong>能替代路由守卫吗？</strong></td>
            <td>❌ 不能，路由守卫更早、更集中、更高效</td>
          </tr>
          <tr>
            <td><strong>什么时候必须用它？</strong></td>
            <td>路由守卫拦不到的“组件级动态渲染”“非路由跳转”“微前端内部”</td>
          </tr>
          <tr>
            <td><strong>最佳实践是什么？</strong></td>
            <td>
              路由守卫做大门拦截 + <code>beforeCreate</code> 做组件级二次校验
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <p style="color: #999; font-size: 14px; text-align: center">
        📌 路由守卫是“大门保安”，<code>beforeCreate</code>
        权限拦截是“房间门锁”<br />
        大门先拦，房间再锁，双重保险最安全。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PermissionArticle",
  data() {
    return {
      text: `
beforeCreate 是组件生命周期中第一个执行的钩子。
此时 data、methods、computed 都不存在。
如果你需要在组件实例化的一瞬间就决定是否让它继续运行，这是最后的机会。

场景：封装高级权限指令或基础类组件。

做法：如果检测到用户没有权限，直接在这里抛出错误或跳转路由，
可以避免 Vue 去初始化 data 和 computed，从而节省性能。      
      `,
    };
  },
};
</script>

<style scoped>
/* ===== 文章样式（像一本书） ===== */
.article {
  max-width: 1200px;
  margin: 30px 40px 0 0;
  padding: 40px 48px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #1a1a2e;
  background: #fcfcfc;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

h1 {
  font-size: 30px;
  line-height: 1.3;
  margin-bottom: 16px;
  border-bottom: 3px solid #42b983;
  padding-bottom: 12px;
}

h1 code {
  font-size: 28px;
}

h2 {
  font-size: 22px;
  margin: 36px 0 12px 0;
  color: #1a1a2e;
  border-left: 4px solid #42b983;
  padding-left: 14px;
}

h3 {
  font-size: 17px;
  margin: 24px 0 8px 0;
  color: #2c3e50;
}

p {
  margin: 12px 0;
}

blockquote {
  margin: 20px 0;
  padding: 16px 24px;
  background: #f0f7ff;
  border-left: 4px solid #42b983;
  border-radius: 0 6px 6px 0;
  font-size: 15px;
  color: #2c3e50;
}

blockquote code {
  background: #e0ecf9;
}

code {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: "SF Mono", "Menlo", "Monaco", "Consolas", monospace;
  font-size: 14px;
  color: #c7254e;
}

.article pre {
  background: #1a1a2e;
  color: #e0e0e0;
  padding: 16px 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 18px;
  line-height: 1.6;
  font-family: "SF Mono", "Menlo", "Monaco", "Consolas", monospace;
  margin: 12px 0;
}

pre code {
  background: transparent;
  color: inherit;
  padding: 0;
  font-size: 14px;
}

/* ===== 表格 ===== */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 15px;
}

th,
td {
  padding: 10px 14px;
  border: 1px solid #e0e0e0;
  text-align: left;
  vertical-align: top;
}

th {
  background: #f5f6fa;
  font-weight: 600;
  color: #1a1a2e;
}

td code {
  font-size: 13px;
}

/* ===== 列表 ===== */
ul {
  padding-left: 24px;
  margin: 12px 0;
}

ul li {
  margin-bottom: 10px;
  line-height: 1.6;
}

ul li strong {
  color: #1a1a2e;
}

ul li code {
  font-size: 13px;
}

/* ===== 分割线 ===== */
hr {
  margin: 40px 0 20px 0;
  border: none;
  border-top: 1px solid #e8ecf1;
}

/* ===== 响应式 ===== */
@media (max-width: 600px) {
  .article {
    padding: 20px 16px;
  }

  h1 {
    font-size: 22px;
  }

  h1 code {
    font-size: 20px;
  }

  h2 {
    font-size: 18px;
  }

  th,
  td {
    padding: 6px 8px;
    font-size: 13px;
  }

  pre {
    font-size: 12px;
    padding: 12px;
  }

  pre code {
    font-size: 12px;
  }
}
</style>
