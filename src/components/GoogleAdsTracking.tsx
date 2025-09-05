import Script from 'next/script'

const GoogleAdsTracking = () => {
  return (
    <>
      <Script
        id="google-ads-script"
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17104994752"
        strategy="afterInteractive"
      />
      <Script
        id="google-ads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17104994752');
          `,
        }}
      />
    </>
  )
}

export default GoogleAdsTracking