//
//  LeftMemuViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/29.
//  Copyright © 2016年 Rany. All rights reserved.
//

#import "LeftMemuViewController.h"
#import "LeftMemuDetailViewController.h"

@interface LeftMemuViewController ()<UIScrollViewDelegate>

{
    LeftMemuDetailViewController *_detailVC;
    
    BOOL _isShow;
}
@property (strong, nonatomic) IBOutlet UIScrollView *scorllView;
@property (strong, nonatomic) IBOutlet UIView *menuContainView;

@end

@implementation LeftMemuViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
//    self.menuContainView.layer.anchorPoint = CGPointMake(1.0, 0.5);
    

    _isShow = NO;
    
}

-(void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    self.menuContainView.layer.anchorPoint = CGPointMake(1.0, 0.5);
    [self hideOrShowMenu:NO animated:false];

}

-(void)viewWillAppear:(BOOL)animated
{
//    self.navigationController.navigationBarHidden = YES;
}

- (void)hideOrShowMenu:(BOOL)isShow animated:(BOOL)isAnimated
{
    CGFloat xOffset = CGRectGetWidth(self.menuContainView.bounds);

    CGPoint contentOffset = isShow?CGPointZero:CGPointMake(xOffset, 0);
    
    [self.scorllView setContentOffset:contentOffset animated:isAnimated];
    

    _isShow = isShow;

}

-(void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    
//    if ([segue.identifier isEqualToString:@"DetailViewSegue"]) {
//        
//        UIViewController *vc = segue.destinationViewController;
//        
//        _detailVC = (LeftMemuDetailViewController *)vc;
//    }

}

-(void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    
    NSLog(@"contoffset>>> %@",NSStringFromCGPoint(scrollView.contentOffset));
    
    CGFloat multiplier = 1.0 / CGRectGetWidth(self.menuContainView.bounds);
    CGFloat offset = scrollView.contentOffset.x * multiplier;
    CGFloat fraction = 1.0 - offset;
    //    println("didScroll offset \(offset)")
    self.menuContainView.layer.transform = [self transformForFraction:fraction];
    self.menuContainView.alpha = fraction;
    
//    if let detailViewController = detailViewController {
//        if let rotatingView = detailViewController.hamburgerView {
//            rotatingView.rotate(fraction)
//        }
//    }
    

    scrollView.pagingEnabled = scrollView.contentOffset.x < (scrollView.contentSize.width - CGRectGetWidth(scrollView.frame));
    
    CGFloat menuOffset = CGRectGetWidth(self.menuContainView.bounds);
    
    _isShow = !CGPointEqualToPoint(CGPointMake(menuOffset, 0), scrollView.contentOffset);
    
}


- (CATransform3D)transformForFraction:(CGFloat)fraction
{
    CATransform3D identity = CATransform3DIdentity;
    identity.m34 = -1.0 / 1000.0;
    double angle = (1.0 - fraction) * -M_PI_2;
    CGFloat xOffset = CGRectGetWidth(self.menuContainView.bounds) * 0.5;
    CATransform3D rotateTransform = CATransform3DRotate(identity, angle, 0.0, 1.0, 0.0);
    CATransform3D translateTransform = CATransform3DMakeTranslation(xOffset, 0.0, 0.0);
    return CATransform3DConcat(rotateTransform, translateTransform);
    
}

@end
