//
//  MaterTopView.h
//  SuperDemo
//
//  Created by Rany on 16/8/24.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface MaterTopView : UIView

@property (nonatomic ,copy) NSString *mainTitle;

@property (nonatomic ,copy) NSString *detailTitle;

- (void)reloadViewWithScrollView:(UIScrollView *)scrollView;


@end
