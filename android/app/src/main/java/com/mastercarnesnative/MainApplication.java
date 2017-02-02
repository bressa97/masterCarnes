package com.mastercarnesnative;

import android.app.Application;

import com.evollu.react.fcm.FIRMessagingPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactApplication;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FIRMessagingPackage(),
          new FIRMessagingPackage(),
          new LinearGradientPackage()
      );
    }

  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
