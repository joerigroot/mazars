(() => ({
  name: 'Cookie',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { analyticsUrl, googleTag } = options;
    const { env } = B;
    const isDev = env === 'dev';

    useEffect(() => {
      if (window.localStorage.getItem('cookies-accepted') === null) {
        B.triggerEvent('onCheckCookies')
      }
    })

    const enableAnalytics = () => {
      const analyticsAccepted = window.localStorage.getItem('analytical-cookies')
      if (!isDev && analyticsAccepted === 'true') {
        if (
          !document.querySelector('[data-script="google-tag"]') &&
          googleTag.length > 0
        ) {
          // Google Tag Manager
          const tagScript = document.createElement('script');
          const tagUrl = `https://www.googletagmanager.com/gtag/js?id=${googleTag}`
          tagScript.src = tagUrl;
          tagScript.async = true;
          tagScript.setAttribute('data-script', 'google-tag');
          document.head.prepend(tagScript);
          // End Google Tag Manager

          const tagScriptDataLayer = document.createElement('script');
          const inlineScript = document.createTextNode(
            `window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${googleTag}');`
          )

          tagScriptDataLayer.appendChild(inlineScript);
          document.head.append(tagScriptDataLayer)
        }

        // WAAR WORDT DIT VOOR GEBRUIKT???
        if (
          !document.querySelector('[data-script="google-analytics"]') &&
          analyticsUrl.length > 0
        ) {
          // Google Analytics
          const analyticsScript = document.createElement('script');
          analyticsScript.src = analyticsUrl;
          analyticsScript.setAttribute('data-script', 'google-analytics');
          //document.head.prepend(analyticsScript);
          // End Google Analytics
        }
      }
    }

    enableAnalytics()

    B.defineFunction('setCookieValue', event => {
      window.localStorage.setItem('cookies-accepted', true)
      if (document.querySelector('input[name="compulsory"]').closest('.MuiCheckbox-root').classList.contains('Mui-checked')) {
        window.localStorage.setItem('compulsory-cookies', true)
      } else {
        window.localStorage.removeItem('compulsory-cookies')
      }
      if (document.querySelector('input[name="analytical"]').closest('.MuiCheckbox-root').classList.contains('Mui-checked')) {
        window.localStorage.setItem('analytical-cookies', true)
      } else {
        window.localStorage.removeItem('analytical-cookies')
      }
      if (document.querySelector('input[name="marketing"]').closest('.MuiCheckbox-root').classList.contains('Mui-checked')) {
        window.localStorage.setItem('marketing-cookies', true)
      } else {
        window.localStorage.removeItem('marketing-cookies')
      }
      enableAnalytics()
    })

    const imgUrl = 'https://assets.bettyblocks.com/b809f00297c044f99d1a9f4b1752f16b_assets/files/Cookie.svg';

    return isDev ? <div className={classes.empty}><img src={imgUrl} alt='cookies' /><h3>Cookies configuration</h3></div> : <></>;
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    return {
      root: {},
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
        borderStyle: 'dashed',
        backgroundColor: 'rgb(240, 241, 245)',
        padding: '15px',
        margin: '15px',
        '& img': {
          width: '30px',
          boxSizing: 'border-box',
          marginRight: '10px',
        }
      },
    };
  },
}))();