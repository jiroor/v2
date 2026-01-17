//
//  HomeView.swift
//  CameraSharing
//
//  Created by Claude Code on 2025-01-16.
//

import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationView {
            VStack(spacing: 40) {
                Text("カメラ共有")
                    .font(.largeTitle)
                    .fontWeight(.bold)

                VStack(spacing: 20) {
                    NavigationLink(destination: Text("カメラモード（準備中）")) {
                        HomeButton(
                            title: "カメラモード",
                            subtitle: "映像を配信する",
                            iconName: "video.fill"
                        )
                    }

                    NavigationLink(destination: Text("ビューワーモード（準備中）")) {
                        HomeButton(
                            title: "ビューワーモード",
                            subtitle: "映像を視聴する",
                            iconName: "eye.fill"
                        )
                    }
                }
                .padding(.horizontal)

                Spacer()
            }
            .padding(.top, 60)
            .navigationBarHidden(true)
        }
    }
}

struct HomeButton: View {
    let title: String
    let subtitle: String
    let iconName: String

    var body: some View {
        HStack {
            Image(systemName: iconName)
                .font(.system(size: 30))
                .foregroundColor(.blue)
                .frame(width: 60)

            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                    .foregroundColor(.primary)
                Text(subtitle)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .foregroundColor(.gray)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
