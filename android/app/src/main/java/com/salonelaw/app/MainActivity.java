package com.salonelaw.app;

import android.app.Activity;
import android.content.res.AssetManager;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.InputStream;

public class MainActivity extends Activity {
    private static final String TAG = "SaloneLaw";
    private static final String APP_ORIGIN = "https://salonelaw.app";
    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            requestWindowFeature(Window.FEATURE_NO_TITLE);
            getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
                WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED
            );

            mWebView = new WebView(this);
            WebSettings webSettings = mWebView.getSettings();
            webSettings.setJavaScriptEnabled(true);
            webSettings.setDomStorageEnabled(true);
            webSettings.setDatabaseEnabled(true);
            webSettings.setAllowFileAccess(true);
            webSettings.setAllowContentAccess(true);
            webSettings.setAllowFileAccessFromFileURLs(true);
            webSettings.setAllowUniversalAccessFromFileURLs(true);
            webSettings.setMediaPlaybackRequiresUserGesture(false);
            webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);

            mWebView.setWebChromeClient(new WebChromeClient());
            mWebView.setWebViewClient(new WebViewClient() {
                @Override
                public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                    String url = request.getUrl().toString();
                    if (url.startsWith(APP_ORIGIN) || url.startsWith("file:///android_asset/")) {
                        try {
                            String path = request.getUrl().getPath();
                            if (path == null || path.isEmpty() || path.equals("/")) {
                                path = "index.html";
                            }
                            if (path.startsWith("/")) {
                                path = path.substring(1);
                            }

                            String assetPath = "public/" + path;
                            AssetManager assetManager = getAssets();

                            InputStream is;
                            try {
                                is = assetManager.open(assetPath);
                            } catch (Exception notFound) {
                                // Fallback to index.html for SPA client-side routes
                                assetPath = "public/index.html";
                                is = assetManager.open(assetPath);
                            }

                            String mimeType = getMimeType(assetPath);
                            return new WebResourceResponse(mimeType, "UTF-8", is);
                        } catch (Exception e) {
                            Log.w(TAG, "Asset load intercept note: " + e.getMessage());
                        }
                    }
                    return super.shouldInterceptRequest(view, request);
                }

                private String getMimeType(String path) {
                    if (path.endsWith(".html")) return "text/html";
                    if (path.endsWith(".js") || path.endsWith(".mjs")) return "application/javascript";
                    if (path.endsWith(".css")) return "text/css";
                    if (path.endsWith(".json")) return "application/json";
                    if (path.endsWith(".png")) return "image/png";
                    if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
                    if (path.endsWith(".svg")) return "image/svg+xml";
                    if (path.endsWith(".woff2")) return "font/woff2";
                    if (path.endsWith(".woff")) return "font/woff";
                    if (path.endsWith(".ttf")) return "font/ttf";
                    return "application/octet-stream";
                }
            });

            mWebView.loadUrl(APP_ORIGIN + "/index.html");
            setContentView(mWebView);
        } catch (Exception e) {
            Log.e(TAG, "Fatal launch error: ", e);
        }
    }

    @Override
    public void onBackPressed() {
        if (mWebView != null && mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
