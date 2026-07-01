'use client'

import { PageBanner } from '@/components/layout/PageBanner'
import { useT } from '@/hooks/useT'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PageBannerBlock(props: any) {
  const t = useT()

  const breadcrumbs: { label: string; href?: string }[] = [
    { label: t(props.breadcrumb1Label || 'পেজ', props.breadcrumb1LabelEn), href: props.breadcrumb1Href || undefined },
  ]
  if (props.breadcrumb2Label) {
    breadcrumbs.push({ label: t(props.breadcrumb2Label, props.breadcrumb2LabelEn) })
  }

  return (
    <PageBanner
      tagText={t(props.tagText, props.tagTextEn)}
      title={t(props.title, props.titleEn)}
      titleHighlight={t(props.titleHighlight, props.titleHighlightEn)}
      subtitle={t(props.subtitle, props.subtitleEn)}
      bgGradient={props.bgGradient}
      bgImageUrl={props.bgImageUrl || ''}
      bgImageFit={props.bgImageFit || 'cover'}
      align={props.align}
      showTag={props.showTag}
      showTitle={props.showTitle}
      showSubtitle={props.showSubtitle}
      breadcrumbs={breadcrumbs}
    />
  )
}
