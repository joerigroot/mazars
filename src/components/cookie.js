(() => ({
  name: 'Cookie',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { hostname, googleTag } = options;
    const { env } = B;
    const isDev = env === 'dev';

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    useEffect(() => {
      let mazarsAcceptCookies = getCookie('mazarsAcceptCookies')
      if (mazarsAcceptCookies != "" && mazarsAcceptCookies != null) {
        enableAnalytics()
      } else {
        B.triggerEvent('onCheckCookies')
      }
    })

    const enableAnalytics = () => {
      let analyticsAccepted = getCookie('mazarsAcceptAnalytics')
      if (!isDev && analyticsAccepted === 'true') {
        if (
          !document.querySelector('[data-script="google-tag"]') &&
          googleTag.length > 0
        ) {
          const tagScript = document.createElement('script');
          const tagUrl = `https://www.googletagmanager.com/gtag/js?id=${googleTag}`
          tagScript.src = tagUrl;
          tagScript.async = true;
          tagScript.setAttribute('data-script', 'google-tag');

          const tagScriptDataLayer = document.createElement('script');
          const inlineScript = document.createTextNode(
            `window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${googleTag}');`
          )

          tagScriptDataLayer.appendChild(inlineScript);

          if (location.hostname === hostname) {
            if (!document.querySelector('[data-script="google-tag"]')) {
              document.head.prepend(tagScript);
              document.head.append(tagScriptDataLayer)
            }
          }
        }

      }
    }

    B.defineFunction('setCookieValue', event => {
      let oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      oneYearFromNow.toGMTString()

      if (document.querySelector('input[name="compulsory"]').closest('.MuiCheckbox-root').classList.contains('Mui-checked')) {
        document.cookie = `mazarsAcceptCookies=true; expires=${oneYearFromNow}`;
      }
      if (document.querySelector('input[name="analytical"]').closest('.MuiCheckbox-root').classList.contains('Mui-checked')) {
        document.cookie = `mazarsAcceptAnalytics=true; expires=${oneYearFromNow}`;
        enableAnalytics()
      }
    })

    const imgUrl = 'https://assets.bettyblocks.com/b809f00297c044f99d1a9f4b1752f16b_assets/files/Cookie.svg';

    return isDev ? <div className={classes.empty}><img src={imgUrl} alt='cookies' /><h3>ACookies configuration</h3></div> : <></>;
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