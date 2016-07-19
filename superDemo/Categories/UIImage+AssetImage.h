//
//  UIImage+AssetImage.h
//  SmartCommunity
//
//  Created by IMac on 15/7/29.
//  Copyright (c) 2015年 Horizontal. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AssetsLibrary/AssetsLibrary.h>

@interface UIImage (AssetImage)

+ (void)fullResolutionImageFromALAsset:(NSURL *)assetUrl result:(void(^)(UIImage *image))result;


@end
