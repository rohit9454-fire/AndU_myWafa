//
//  CheckStandardDevice.swift
//  MyWafa
//
//  Created by Rohit Singh on 02/06/25.
//

import Foundation
import UIKit
import FirebaseCrashlytics
 
final class CheckStandardDevice {
 
    private init() {}
 
    static func standardDeviceCheck() {
        #if targetEnvironment(simulator)
        return
        #endif
 
        func isAppInstalled() -> Bool {
            return UIApplication.shared.canOpenURL(URL(string: "cydia://")!)
        }
 
        func canOpenInvalidURL() -> Bool {
            let invalidUrls = [
                "/private/var/lib/apt",
                "/Applications/Cydia.app",
                "/private/var/lib/cydia",
                "/private/var/tmp/cydia.log",
                "/Applications/RockApp.app",
                "/Applications/Icy.app",
                "/Applications/WinterBoard.app",
                "/Applications/SBSetttings.app",
                "/Applications/blackra1n.app",
                "/Applications/IntelliScreen.app",
                "/Applications/Snoop-itConfig.app",
                "/usr/libexec/cydia/",
                "/usr/sbin/frida-server",
                "/usr/bin/cycript",
                "/usr/local/bin/cycript",
                "/usr/lib/libcycript.dylib",
                "/bin/sh",
                "/usr/libexec/sftp-server",
                "/usr/libexec/ssh-keysign",
                "/Library/MobileSubstrate/MobileSubstrate.dylib",
                "/bin/bash",
                "/usr/sbin/sshd",
                "/etc/apt",
                "/usr/bin/ssh",
                "/bin.sh",
                "/var/checkra1n.dmg",
                "/System/Library/LaunchDaemons/com.saurik.Cydia.Startup.plist",
                "/System/Library/LaunchDaemons/com.ikey.bbot.plist",
                "/Library/MobileSubstrate/DynamicLibraries/LiveClock.plist",
                "/Library/MobileSubstrate/DynamicLibraries/Veency.plist",
                "/etc/apt/sources.list.d/electra.list",
                "/etc/apt/sources.list.d/sileo.sources",
                "/.bootstrapped_electra",
                "/usr/lib/libjailbreak.dylib",
                "/jb/lzma",
                "/.cydia_no_stash",
                "/.installed_unc0ver",
                "/jb/offsets.plist",
                "/usr/share/jailbreak/injectme.plist",
                "/etc/apt/undecimus/undecimus.list",
                "/var/lib/dpkg/info/mobilesubstrate.md5sums",
                "/jb/jailbreakd.plist",
                "/jb/amfid_payload.dylib",
                "/jb/libjailbreak.dylib",
                "/usr/libexec/cydia/firmware.sh",
                "/var/lib/cydia",
                "/private/var/Users/",
                "/var/log/apt",
                "/private/var/stash",
                "/private/var/cache/apt/",
                "/private/var/log/syslog",
                "/Applications/FakeCarrier.app",
                "/Applications/MxTube.app",
                "/Applications/SBSettings.app",
                "/private/var/mobile/Library/SBSettings/Themes",
                "/Library/MobileSubstrate/CydiaSubstrate.dylib"]
 
            for path in invalidUrls {
                if FileManager.default.fileExists(atPath: path) {
                    print("Detected jailbreak file at path: \(path)")
                    return true
                }
            }
            return false
        }
 
        func checkFileWrite() -> Bool {
            let testString = "Jailbreak test"
            do {
                try testString.write(toFile: "/private/test_jb.txt", atomically: true, encoding: .utf8)
                return true
            } catch {
                return false
            }
        }
 
        if isAppInstalled() || canOpenInvalidURL() || checkFileWrite() {
            destroy()
        }
    }
 
    private static func destroy() {
        Crashlytics.crashlytics().log("App terminated due to jailbreak detection.")
        fatalError("App terminated due to jailbreak detection.")
    }
}
