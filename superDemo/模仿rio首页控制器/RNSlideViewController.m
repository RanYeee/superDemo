//
//  RNSlideViewController.m
//  SuperDemo
//
//  Created by Rany on 16/8/6.
//  Copyright © 2016年 Rany. All rights reserved.
//
#define kNavigationBarHeight 64
#define kTopVieHeight 250
#import "RNSlideViewController.h"
#import "SVPullToRefresh.h"
#import "RNTopView.h"
#import "MDTabBar.h"


@interface RNSlideViewController ()<
                                    UIScrollViewDelegate,
                                    MDTabBarDelegate,
                                    UIPageViewControllerDelegate,
                                    UIPageViewControllerDataSource,
                                    UIScrollViewDelegate>

{
    
    CGFloat _oldOffset;
    NSMutableDictionary *viewControllers;
    NSUInteger lastIndex;
    BOOL disableDragging;
    UIScrollView *_tmpScrollView;
}

@property (nonatomic,strong) UITableView *tableView;

@property (nonatomic,strong) RNTopView *topView;

@property (nonatomic,strong) UIPageViewController *pageController;

@end

@implementation RNSlideViewController

- (instancetype)init
{
    self = [super init];
    if (self) {
        
        [self initContent];
    }
    return self;
}

- (void)initContent
{
    
    self.pageController = [[UIPageViewController alloc]
                           initWithTransitionStyle:UIPageViewControllerTransitionStyleScroll
                           navigationOrientation:
                           UIPageViewControllerNavigationOrientationHorizontal
                           options:nil];
    self.pageController.delegate = self;
    self.pageController.dataSource = self;
    self.pageController.view.frame = CGRectMake(0, kNavigationBarHeight, SCREEN_WIDTH, SCREEN_HEIGHT-kNavigationBarHeight);
    // delegate scrollview
    for (UIView *v in self.pageController.view.subviews) {
        if ([v isKindOfClass:[UIScrollView class]]) {
            ((UIScrollView *)v).delegate = self;
        }
    }
    
    // add page controller as child
    [self addChildViewController:self.pageController];
    [self.pageController didMoveToParentViewController:self];
    viewControllers = [[NSMutableDictionary alloc] init];

}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor whiteColor];

    [self.view addSubview:self.topView];

    [self.view insertSubview:self.pageController.view belowSubview:self.topView];
    
  
    
    id viewController =
    [self.delegate tabBarViewController:self
                  viewControllerAtIndex:self.topView.mdTabbar.selectedIndex];
    [viewControllers
     setObject:viewController
     forKey:[NSNumber numberWithInteger:self.topView.mdTabbar.selectedIndex]];
    
    __unsafe_unretained typeof(self) weakSelf = self;
    [_pageController
     setViewControllers:@[ viewController ]
     direction:UIPageViewControllerNavigationDirectionForward
     animated:NO
     completion:^(BOOL finished) {
         if ([weakSelf->_delegate
              respondsToSelector:@selector(tabBarViewController:
                                           didMoveToIndex:)]) {
                  [weakSelf->_delegate
                   tabBarViewController:weakSelf
                   didMoveToIndex:weakSelf->_topView.mdTabbar.selectedIndex];
              }
     }];
    
   
}


- (RNTopView *)topView
{
    if (!_topView) {
        
        _topView = [[RNTopView alloc]initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, kTopVieHeight)];
        
        _topView.mdTabbar.delegate = self;
        
        [_topView setItems:@[@"ONE",@"TOW",@"THREE",@"FOUR",@"FIVE",@"SIX",@"Seven",@"eight",@"nine"]];
        
        [_topView setIconImage:[UIImage imageNamed:@"AppIcon60x60"]];
        

    }
    
    return _topView;
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    
    self.navigationController.navigationBar.hidden = YES;
    

}

-(void)reloadWithScrollView:(UIScrollView *)scrollView
{
        
        [self.topView reloadWithScrollView:scrollView];

    

}

- (void)moveToPage:(NSUInteger)selectedIndex {
    UIViewController *viewController =
    [viewControllers objectForKey:[NSNumber numberWithInteger:selectedIndex]];
    
    if (!viewController) {
        viewController = [self.delegate tabBarViewController:self
                                       viewControllerAtIndex:selectedIndex];
        [viewControllers setObject:viewController
                            forKey:[NSNumber numberWithInteger:selectedIndex]];
    }
    
    UIPageViewControllerNavigationDirection animateDirection =
    selectedIndex > lastIndex
    ? UIPageViewControllerNavigationDirectionForward
    : UIPageViewControllerNavigationDirectionReverse;
    
    __unsafe_unretained typeof(self) weakSelf = self;
    disableDragging = YES;
    self.pageController.view.userInteractionEnabled = NO;
    [self.pageController
     setViewControllers:@[ viewController ]
     direction:animateDirection
     animated:YES
     completion:^(BOOL finished) {
         weakSelf->disableDragging = NO;
         weakSelf->_pageController.view.userInteractionEnabled = YES;
         weakSelf->lastIndex = selectedIndex;
         
         if ([weakSelf->_delegate
              respondsToSelector:@selector(tabBarViewController:
                                           didMoveToIndex:)]) {
                  [weakSelf->_delegate tabBarViewController:weakSelf
                                             didMoveToIndex:selectedIndex];
              }
     }];
}

#pragma mark - setter

-(void)setItems:(NSArray *)items
{
    [self.topView setItems:items];
}
#pragma mark Getter
- (NSUInteger)selectedIndex {
    return self.topView.mdTabbar.selectedIndex;
}

-(void)setSelectedIndex:(NSUInteger)selectedIndex
{
    self.topView.mdTabbar.selectedIndex = selectedIndex;
    [self moveToPage:selectedIndex];
}

#pragma mark - mdTabbarDelegate

-(void)tabBar:(MDTabBar *)tabBar didChangeSelectedIndex:(NSUInteger)selectedIndex
{
    NSLog(@"%lu",(unsigned long)selectedIndex);
}


#pragma PageViewControllerDataSource
- (UIViewController *)pageViewController:
(UIPageViewController *)pageViewController
       viewControllerAfterViewController:(UIViewController *)viewController {
    
    NSInteger index = self.topView.mdTabbar.selectedIndex;
    
    if (index++ < self.topView.mdTabbar.numberOfItems - 1) {
        
        UIViewController *nextViewController =
        [viewControllers objectForKey:[NSNumber numberWithInteger:index]];
        
        if (!nextViewController) {
            nextViewController =
            [self.delegate tabBarViewController:self viewControllerAtIndex:index];
            [viewControllers setObject:nextViewController
                                forKey:[NSNumber numberWithInteger:index]];
        }
        
        return nextViewController;
    }
    
    return nil;
}

- (UIViewController *)pageViewController:
(UIPageViewController *)pageViewController
      viewControllerBeforeViewController:(UIViewController *)viewController {
    
    NSInteger index = self.topView.mdTabbar.selectedIndex;
    
    if (index-- > 0) {
        UIViewController *nextViewController =
        [viewControllers objectForKey:[NSNumber numberWithInteger:index]];
        
        if (!nextViewController) {
            nextViewController =
            [self.delegate tabBarViewController:self viewControllerAtIndex:index];
            [viewControllers setObject:nextViewController
                                forKey:[NSNumber numberWithInteger:index]];
        }
        
        return nextViewController;
    }
    
    return nil;
}

#pragma mark - PageViewController Delegate
- (void)pageViewController:(UIPageViewController *)pageViewController
        didFinishAnimating:(BOOL)finished
   previousViewControllers:(NSArray *)previousViewControllers
       transitionCompleted:(BOOL)completed {
    if (!completed)
        return;
    
    id currentView = [pageViewController.viewControllers objectAtIndex:0];
    
    NSNumber *key = (NSNumber *)[viewControllers allKeysForObject:currentView][0];
    self.topView.mdTabbar.selectedIndex = [key integerValue];
    lastIndex = self.topView.mdTabbar.selectedIndex;
    
    // call delegate
    if ([self.delegate
         respondsToSelector:@selector(tabBarViewController:didMoveToIndex:)]) {
        [self.delegate tabBarViewController:self
                             didMoveToIndex:self.topView.mdTabbar.selectedIndex];
    }
}



#pragma mark - ScrollView Delegate

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    
    CGPoint offset = scrollView.contentOffset;
    
    CGFloat scrollViewWidth = scrollView.frame.size.width;
    
    int selectedIndex = (int)self.topView.mdTabbar.selectedIndex;
    
    if (!disableDragging) {
        float xDriff = offset.x - scrollViewWidth;
        UIView *selectedTab = (UIView *)[self.topView.mdTabbar tabs][selectedIndex];
        
        if (offset.x < scrollViewWidth) {
            if (self.topView.mdTabbar.selectedIndex == 0)
                return;
            
            UIView *leftTab = (UIView *)[self.topView.mdTabbar tabs][selectedIndex - 1];
            
            float widthDiff = selectedTab.frame.size.width - leftTab.frame.size.width;
            
            float newOriginX = selectedTab.frame.origin.x +
            xDriff / scrollViewWidth * leftTab.frame.size.width;
            
            float newWidth =
            selectedTab.frame.size.width + xDriff / scrollViewWidth * widthDiff;
            
            CGRect frame =
            CGRectMake(newOriginX, kMDTabBarHeight - kMDIndicatorHeight, newWidth,
                       kMDIndicatorHeight);
            [self.topView.mdTabbar moveIndicatorToFrame:frame withAnimated:NO];
            
        } else {
            if (selectedIndex + 1 >= self.topView.mdTabbar.numberOfItems)
                return;
            
            UIView *rightTab = (UIView *)[self.topView.mdTabbar tabs][selectedIndex + 1];
            
            float widthDiff =
            rightTab.frame.size.width - selectedTab.frame.size.width;
            
            float newOriginX =
            selectedTab.frame.origin.x +
            xDriff / scrollViewWidth * selectedTab.frame.size.width;
            
            float newWidth =
            selectedTab.frame.size.width + xDriff / scrollViewWidth * widthDiff;
            
            CGRect frame =
            CGRectMake(newOriginX, kMDTabBarHeight - kMDIndicatorHeight, newWidth,
                       kMDIndicatorHeight);
            [self.topView.mdTabbar moveIndicatorToFrame:frame withAnimated:NO];
        }
    }
}


@end
