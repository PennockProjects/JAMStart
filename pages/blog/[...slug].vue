<script setup>
  const activeId = ref(null)

onMounted(() => {
  const callback = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id
        break;
      }
    }
  }
  const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0.5
  })
  const elements = document.querySelectorAll('h2, h3')

  for (const element of elements) {
    observer.observe(element)
  }

  onBeforeUnmount(() => {
    for (const element of elements) {
      observer.unobserve(element)
    }
  })
})

</script>

<template>
  <div>
    <ContentDoc>
      <template v-slot="{ doc }">
        <article class="mx-auto">
          <div class="grid grid-cols-6 gap-16">
            <div 
              class="prose dark:prose-invert lg:prose-xl prose-code:bg-gray-100 dark:prose-code:bg-black prose-pre:bg-gray-100 dark:prose-pre:bg-black" 
              :class="{'col-span-6 md:col-span-4' : doc.isToc, 'col-span-6' : !doc.isToc}"
            >
              <h1>{{ doc.title }}</h1>
              <ContentRenderer :value="doc" />
            </div>
            <div class="hidden md:col-span-2 md:block" v-if="doc.isToc">
              <aside class="sticky top-8">
                <div class="font-semibold mb-2">
                  Table of Contents
                </div>
                <nav>
                  <TocLinks :links="doc.body.toc.links" :activeId="activeId" />
                </nav>
            </aside>
            </div>
          </div>
        </article>
      </template>
      <template #not-found>
        <h1>Document not found (404)</h1>
        <p>This blog post cound not be found</p>
      </template>
    </ContentDoc>
  </div>
</template>