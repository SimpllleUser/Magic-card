import { useDictionaryStore } from '@/stores/dictionary';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const isFunction = (value: unknown): value is Function => typeof value === 'function';

const DEFAULT_BREADCRUMB = 'Home';

export function useBreadcrumbs() {
  const route = useRoute();
  const dictionaryStore = useDictionaryStore();
  const breadcrumbs = computed(() => {
    const seenPaths = new Set<string>();
    const params = route.params as Record<string, string>;

    return route.matched
      .filter((item) => {
        const isDuplicate = seenPaths.has(item.path);
        seenPaths.add(item.path);
        return !isDuplicate;
      })
      .map((item) => {
        let path = item.path;
        const paramReplacements = Object.entries(params).reduce((acc, [key, value]) => {
          acc[`:${key}`] = value || '';
          return acc;
        }, {} as Record<string, string>);

        const paramRegex = new RegExp(Object.keys(paramReplacements).join('|'), 'g');

        if (path.includes('/:')) {
          path = path.replace(paramRegex, (match) => paramReplacements[match]);
        }

        let breadcrumbText = isFunction(item.meta?.breadcrumb)
          ? item.meta.breadcrumb(route)
          : item.meta?.breadcrumb || path?.split('/')?.pop() || DEFAULT_BREADCRUMB;

        if (item.path.includes('/:id') && item.meta.useName) {
          breadcrumbText = dictionaryStore.getById(route.params.id)?.title;

          // TODO: Add condition to generalize this function if more base action sections are added
          if (path.includes('update')) {
            breadcrumbText = `Update ${breadcrumbText}`;
          }
        }

        return {
          path,
          to: path,
          title: breadcrumbText
        };
      });
  });

  return { breadcrumbs };
}
